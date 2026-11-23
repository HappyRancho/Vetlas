import entries from "./regional-facilities.json";
import additional from "./additional-branches.json";
import branchRatings from "./branch-ratings.json";
import branchCare from "./branch-care.json";
import type { Provider } from "./types";

export const regionalProviders: Provider[] = [...entries, ...additional].map(entry => {
  const slug = (entry.name + "-" + entry.area).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
  const id = entry.city + "-" + slug;
  const care = branchCare[id as keyof typeof branchCare];
  const rating = branchRatings[id as keyof typeof branchRatings];
  const services = [...new Set([...entry.services, ...(care?.services ?? [])])];
  const directorySource = /myfurries[.]com|justdial[.]com|sploot[.]space/.test(entry.source);
  const emergency = entry.services.includes("Emergency care");
  const college = entry.name.startsWith("Madras Veterinary College");
  return {
    id, slug, name: entry.name, cityId: entry.city,
    type: entry.type as Provider["type"], area: entry.area, address: entry.address,
    phone: entry.phone || undefined, hours: { open24: entry.hours === "Open 24 hours" },
    hoursNote: entry.hours || undefined,
    ...(college ? {visitHours:{summary:"Morning outpatient clinics · 24-hour emergency care",checkedAt:"2026-11-23",schedule:[{days:"Monday–Friday",time:"8 am–1 pm"},{days:"Weekends and public holidays",time:"8 am–11:30 am"}],note:"Outpatient hours above. Emergency care operates around the clock.",sourceLabel:"TANUVAS Directorate of Clinics",sourceUrl:"https://tanuvas.ac.in/dc_intro.php"}} : {}), specialtyIds: [...new Set(["general", ...(care?.ids ?? []), ...(emergency ? ["emergency"] : []), ...(/CT|Ultrasound|MRI/.test(entry.services.join(" ")) ? ["imaging"] : []), ...(entry.services.includes("Surgery") ? ["surgery"] : []), ...(entry.services.includes("Dental care") ? ["dentistry"] : [])])],
    ...(college ? {consultationListing:{min:20,max:100,kind:"registration",note:"Seven-day registration is ₹100 for a small animal or ₹20 for a large animal. Tests and procedures carry separate charges.",sourceUrl:"https://tanuvas.ac.in/mvc_clinics.php"}} : {}),
    ...(entry.name === "Tata Trusts Small Animal Hospital" ? {consultationListing:{min:500,max:1500,kind:"directory",note:"PetShelter lists this range for the Mahalaxmi hospital. The hospital has not confirmed a tariff. Check the department and appointment price when booking.",sourceUrl:"https://www.petshelter.org/clinics/tata-trust-small-animal-hospital"}} : {}),
    services, species: care?.species ?? [], amenities: [], verified: false, dataSource: "public",
    about: care?.about ?? (college ? "The teaching hospital at the Madras Veterinary College campus in Vepery offers outpatient consultations and round-the-clock emergency care for large and small animals." :
      entry.name.includes("Jivdaya") ? "The Ambawadi hospital treats unowned domestic animals and injured wildlife. Contact the trust about eligibility and intake before bringing an animal." :
      entry.name + " is listed in " + entry.area + ". " + (emergency ? "The published branch information describes emergency care. Call ahead to confirm the team can receive your pet." : "Check the linked branch information for appointments and current clinical services.")),
    ...(entry.city === "pune" ? { confidence: "medium" as const, researchNote: "Branch details are listed in the linked sources." } : {}),
    ...(rating ? {
      platformRatings: [{platform:"Justdial",score:rating.score,count:rating.count,countLabel:"ratings",kind:"cross-web" as const,access:"page" as const,checkedAt:"2026-11-23",url:rating.url,note:"The branch listing reports this aggregate. Justdial can include ratings from across the web."}],
      ...(rating.coordinates ? {coordinates:rating.coordinates, coordinateSource:rating.url} : {}),
    } : {}),
    lastChecked: "2026-11-23", sources: directorySource ? { directory: entry.source } : { website: entry.source },
    evidence: [...(rating ? [{label:"Branch address, map location and Justdial ratings",url:rating.url}] : []), ...(care ? [{label:care.label, url:care.source}] : []), { label: directorySource ? "Local practice listing" : "Provider or institution", url: entry.source }, { label: "Branch and location reference", url: entry.corroboration }].filter((item,i,all)=>all.findIndex(other=>other.url===item.url)===i),

  };
});
