import { cities, providers, doctors, cityById, specialtyById } from "@data";
import { veterinarians } from "./veterinarians";
import { summarizeRatings } from "../lib/ratings.mjs";

interface Entry {name:string; city:string; href:string; detail:string}
const facilityEntries = (hospital: boolean) => providers
  .filter(p => hospital ? p.type === "hospital" || p.type === "government" || /animal hospital/i.test(p.name) : p.type === "clinic")
  .map(p => ({ p, rating:summarizeRatings(p.platformRatings).average }))
  .filter(row => row.rating !== null)
  .sort((a,b) => b.rating! - a.rating! || a.p.name.localeCompare(b.p.name))
  .slice(0,10)
  .map(({p,rating}) => ({ name:p.name, city:p.cityId, href:`/${p.cityId}/${p.slug}/`, detail:`${rating!.toFixed(1)}/5 · ${p.area}` }));

const clinicians = [
  ...doctors.map(d=>({name:"Dr. "+d.name,city:d.cityId,href:`/${d.cityId}/veterinarians/${d.slug}/`,detail:d.degrees.join(" · ") || specialtyById(d.primarySpecialtyId)?.name || "Veterinarian",surgery:[d.primarySpecialtyId,...d.secondarySpecialtyIds].includes("surgery")})),
  ...veterinarians.map(v=>({name:"Dr. "+v.name,city:v.cityId,href:`/${v.cityId}/veterinarians/${v.slug}/`,detail:v.practice,surgery:v.focus.some(f=>/surgery/i.test(f))}))
].sort((a,b)=>a.name.localeCompare(b.name));
function doctorEntries(surgery: boolean): Entry[] {
  const eligible = clinicians.filter(d => !surgery || d.surgery);
  const queues = cities.map(c => eligible.filter(d => d.city === c.id));
  const result: Entry[] = [];
  for (let index=0; result.length < 10 && queues.some(queue => queue[index]); index++) {
    for (const queue of queues) if (queue[index] && result.length < 10) result.push(queue[index]);
  }
  return result;
}
const ratingMethod = "Ordered by the average of each branch’s available public platform scores. Ties are alphabetical. Coverage is limited to rated branches in Vetlas.";
const doctorMethod = "Selected across cities with published profiles, taking one name per city each round in alphabetical order within the city.";
export const finds = [
  {slug:"veterinary-hospitals", label:"Veterinary hospitals",icon:"hospital",entries:facilityEntries(true),method:ratingMethod,all:"/hospitals/"},
  {slug:"vet-clinics",label:"Veterinary clinics",icon:"stethoscope",entries:facilityEntries(false),method:ratingMethod,all:"/clinics/"},
  {slug:"veterinarians",label:"Veterinarians",icon:"doctor",entries:doctorEntries(false),method:doctorMethod,all:"/doctors/"},
  {slug:"veterinary-surgery",label:"Veterinarians with a surgical focus",icon:"scissors",entries:doctorEntries(true),method:"These profiles list surgery as a care interest or speciality. "+doctorMethod,all:"/specialties/surgery/"}
].map(f=>({...f, title:`${f.entries.length} ${f.label.toLowerCase()} in India`, href:`/finds/${f.slug}/`, entries:f.entries.map(e=>({...e,city:cityById(e.city)?.name ?? e.city}))}));
