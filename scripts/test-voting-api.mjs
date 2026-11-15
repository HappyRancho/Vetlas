import assert from 'node:assert/strict';
const base=process.env.VETLAS_TEST_URL||'http://127.0.0.1:4324';
if(!/^http:\/\/(localhost|127\.0\.0\.1):/.test(base))throw Error('Write tests must only run against local storage.');
const path='/api/cost-votes/indore-myra-usha';const cookies=[];
async function call(method,cookie,data,extra={}){const response=await fetch(base+path,{method,headers:{Origin:base,'Content-Type':'application/json',...(cookie?{Cookie:cookie}:{}),...extra},body:data===undefined?undefined:JSON.stringify(data)});return{response,data:await response.json()};}
try{
 for(let i=0;i<3;i++){const r=await call('GET');cookies.push(r.response.headers.get('set-cookie').split(';')[0]);}
 const initial=await call('GET',cookies[0]);assert.equal(initial.data.total,0,'Use a clean local database');
 assert.equal((await call('POST',null,{band:'1-1000',consent:true})).response.status,401);
 assert.equal((await call('POST',cookies[0],{band:'1-1000',amount:2000,consent:true})).response.status,400);
 assert.equal((await call('POST',cookies[0],{band:'1-1000',consent:true},{Origin:'https://attacker.invalid'})).response.status,403);
 assert.equal((await call('POST',cookies[0],{band:'1-1000',consent:true,extra:'x'.repeat(2100)})).response.status,413);
 const one=await call('POST',cookies[0],{band:'1-1000',consent:true});assert.equal(one.data.total,1);assert.equal(one.data.estimatedAverage,501);
 const two=await call('POST',cookies[1],{band:'1001-2500',amount:1850,consent:true});assert.equal(two.data.total,2);assert.equal(two.data.estimatedAverage,1175);
 const three=await call('POST',cookies[2],{band:'25001-plus',consent:true});assert.equal(three.data.total,3);assert.equal(three.data.excludedOpenEnded,1);
 const updated=await call('POST',cookies[0],{band:'2501-5000',amount:3000,consent:true});assert.equal(updated.data.total,3);assert.equal(updated.data.estimatedAverage,2425);
 const reader=await call('GET');assert.equal(reader.data.total,3);assert.equal(reader.data.mine,null);assert(!JSON.stringify(reader.data).includes('voter'));
 const own=await call('GET',cookies[0]);assert.equal(own.data.mine.amount,3000);
 assert.equal((await fetch(base+'/api/cost-votes/not-a-provider')).status,404);
 console.log('PASS: shared SQLite-backed votes, cookie identity, exact/band calculation, update without duplication, delete, input and origin limits, private vote identifiers.');
}finally{for(const cookie of cookies)await call('DELETE',cookie);}
assert.equal((await call('GET')).data.total,0);
