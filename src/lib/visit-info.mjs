export function consultationLabel(provider) {
 if(provider.fees)return {amount:`${provider.feeIsStarting?'From ':''}₹${provider.fees.opd.toLocaleString('en-IN')}`,caption:'Consultation · listed fee'};
 const rate=provider.consultationListing;
 if(rate)return {amount:rate.min===rate.max?`₹${rate.min.toLocaleString('en-IN')}`:`₹${rate.min.toLocaleString('en-IN')}–${rate.max.toLocaleString('en-IN')}`,caption:rate.kind==='historical'?'Previously listed · ask current fee':'Published fee range'};
 if(provider.id?.includes('jivdaya-charitable'))return {amount:'Free for unowned animals',caption:'Eligibility per Jivdaya Charitable Trust'};
 return {amount:'Fee unpublished',caption:'Routine consultation'};
}
export function hoursLabel(provider){return provider.visitHours?.summary || (provider.hours.open24?'24-hour service':provider.hours.open&&provider.hours.close?`${provider.hours.open}–${provider.hours.close}`:'Call for timings');}
