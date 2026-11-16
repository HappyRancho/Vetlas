export const COST_BANDS = [
  {id:'1-1000',label:'₹1–1,000',min:1,max:1000},
  {id:'1001-2500',label:'₹1,001–2,500',min:1001,max:2500},
  {id:'2501-5000',label:'₹2,501–5,000',min:2501,max:5000},
  {id:'5001-10000',label:'₹5,001–10,000',min:5001,max:10000},
  {id:'10001-25000',label:'₹10,001–25,000',min:10001,max:25000},
  {id:'25001-plus',label:'₹25,001+',min:25001,max:null},
];
export function validateVote(input) {
  const band=COST_BANDS.find(b=>b.id===input?.band);
  if(!band) return 'Choose a valid cost range.';
  if(input.consent!==true) return 'Confirm this was your own visit.';
  if(input.amount!==undefined && input.amount!==null && (!Number.isInteger(input.amount)||input.amount<band.min||input.amount>(band.max??1000000))) return 'Enter a whole-rupee total within your selected range (maximum ₹10,00,000).';
  return null;
}
export function summarizeVotes(rows) {
  const bands=COST_BANDS.map(b=>({...b,count:0}));let sum=0,estimatedCount=0,exactCount=0,exactSum=0,midpointCount=0;
  for(const row of rows){const band=bands.find(b=>b.id===row.band);if(!band)continue;band.count++;
    if(row.amount!==null&&row.amount!==undefined){sum+=row.amount;exactSum+=row.amount;exactCount++;estimatedCount++;}
    else if(band.max!==null){sum+=(band.min+band.max)/2;midpointCount++;estimatedCount++;}
  }
  const total=bands.reduce((n,b)=>n+b.count,0);
  return {total,bands,estimatedAverage:estimatedCount?Math.round(sum/estimatedCount):null,estimatedCount,midpointCount,exactAverage:exactCount?Math.round(exactSum/exactCount):null,exactCount,excludedOpenEnded:total-estimatedCount,method:'Exact amounts when supplied; otherwise bounded range midpoints. Open-ended votes without an amount are excluded from the mean.',scope:'Self-reported total visit bills in the last 12 months, not verified invoices or a clinical quote.'};
}
