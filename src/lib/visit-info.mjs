export function consultationLabel(provider) {
 if(provider.fees)return {amount:`${provider.feeIsStarting?'From ':''}₹${provider.fees.opd.toLocaleString('en-IN')}`,caption:'Consultation · listed fee'};
 const rate=provider.consultationListing;
 if(rate)return {amount:rate.min===rate.max?`₹${rate.min.toLocaleString('en-IN')}`:`₹${rate.min.toLocaleString('en-IN')}–${rate.max.toLocaleString('en-IN')}`,caption:rate.kind==='historical'?'Previously listed · ask current fee':'Published fee range'};
 return {amount:'Ask clinic',caption:'Consultation charge'};
}
export function hoursLabel(provider){return provider.visitHours?.summary || (provider.hours.open24?'24-hour service':provider.hours.open&&provider.hours.close?`${provider.hours.open}–${provider.hours.close}`:'Call for timings');}
