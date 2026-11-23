import { validateVote, summarizeVotes } from '../src/lib/cost-votes.mjs';
import { providers as directory } from '../src/data/index';
const providers=new Set(directory.map(p=>p.id));
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const json=(data,status=200,headers={})=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,'0')).join('');
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(!url.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
  const match=url.pathname.match(/^\/api\/cost-votes\/([a-z0-9-]+)\/?$/);
  if(!match||!providers.has(match[1]))return json({error:'Facility not found.'},404);
  if(!['GET','POST','DELETE'].includes(request.method))return json({error:'Method not allowed.'},405,{Allow:'GET, POST, DELETE'});
  if(request.method!=='GET'){
   if(request.headers.get('Origin')!==url.origin)return json({error:'Submit from the Vetlas website.'},403);
   if(request.method==='POST'&&!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Expected JSON.'},415);
   if(Number(request.headers.get('Content-Length')||0)>2048)return json({error:'Request is too large.'},413);
  }
  const cookie=request.headers.get('Cookie')?.match(/(?:^|;\s*)vetlas_voter=([^;]+)/)?.[1];
  let voter=cookie&&UUID.test(cookie)?cookie:null;
  if(!voter&&request.method!=='GET')return json({error:'Cookies are needed to save or change your vote. Reload and try again.'},401);
  const fresh=!voter;if(!voter)voter=crypto.randomUUID();
  const headers=new Headers({'X-Voter':voter,'X-Client-IP':request.headers.get('CF-Connecting-IP')||'local','Content-Type':'application/json'});
  let body;
  if(request.method==='POST'){
   // Bound streamed input, including requests without Content-Length.
   const reader=request.body?.getReader();if(!reader)return json({error:'Missing vote.'},400);
   let size=0;const chunks=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>2048){await reader.cancel();return json({error:'Request is too large.'},413);}chunks.push(value);}
   body=new TextDecoder().decode(new Uint8Array(chunks.flatMap(chunk=>[...chunk])));
  }
  try{
   const stub=env.COST_VOTES.get(env.COST_VOTES.idFromName(match[1]));
   const response=await stub.fetch(new Request('https://votes.internal/',{method:request.method,headers,body}));
   const outgoing=new Response(response.body,response);
   if(fresh)outgoing.headers.append('Set-Cookie',`vetlas_voter=${voter}; Path=/api/cost-votes; HttpOnly; SameSite=Strict; Max-Age=31536000${url.protocol==='https:'?'; Secure':''}`);
   return outgoing;
  }catch{return json({error:'Voting is temporarily unavailable. Your vote was not confirmed; please retry.'},503);}
 }
};
export class CostVotes {
 constructor(ctx){this.ctx=ctx;this.sql=ctx.storage.sql;this.sql.exec('CREATE TABLE IF NOT EXISTS votes (voter TEXT PRIMARY KEY, band TEXT NOT NULL, amount INTEGER, updated INTEGER NOT NULL)');this.sql.exec('CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, writes INTEGER NOT NULL)');this.sql.exec('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');this.sql.exec("INSERT OR IGNORE INTO settings VALUES ('salt', ?)",crypto.randomUUID());this.salt=this.sql.exec("SELECT value FROM settings WHERE key='salt'").one().value;}
 async fetch(request){
  const now=Date.now(),year=365*86400000,voter=await digest(this.salt+request.headers.get('X-Voter'));
  this.sql.exec('DELETE FROM votes WHERE updated < ?',now-year);
  if(request.method!=='GET'){
   let input;
   if(request.method==='POST'){try{input=await request.json();}catch{return json({error:'Invalid JSON.'},400);}const error=validateVote(input);if(error)return json({error},400);}
   const today=new Date(now).toISOString().slice(0,10), key=today+':'+await digest(this.salt+today+request.headers.get('X-Client-IP'));
   const limit=this.sql.exec('SELECT writes FROM limits WHERE key=?',key).toArray()[0]?.writes||0;
   if(limit>=20)return json({error:'Too many changes from this network today. Try again tomorrow.'},429,{'Retry-After':'86400'});
   this.ctx.storage.transactionSync(()=>{
    this.sql.exec('DELETE FROM limits WHERE key < ?',today);
    this.sql.exec('INSERT INTO limits(key,writes) VALUES (?,1) ON CONFLICT(key) DO UPDATE SET writes=writes+1',key);
    if(request.method==='DELETE')this.sql.exec('DELETE FROM votes WHERE voter=?',voter);
    else this.sql.exec('INSERT INTO votes(voter,band,amount,updated) VALUES (?,?,?,?) ON CONFLICT(voter) DO UPDATE SET band=excluded.band,amount=excluded.amount,updated=excluded.updated',voter,input.band,input.amount??null,now);
   });
  }
  const rows=this.sql.exec('SELECT band, amount FROM votes').toArray();
  const mine=this.sql.exec('SELECT band, amount FROM votes WHERE voter=?',voter).toArray()[0]||null;
  return json({...summarizeVotes(rows),mine,updatedAt:new Date(now).toISOString()});
 }
}
