import entries from "./regional-facilities.json";
import type { Provider } from "./types";

export const regionalProviders: Provider[] = entries.map(entry => {
  const slug = (entry.name + "-" + entry.area).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
  const directorySource = entry.source.includes("myfurries.com");
  const emergency = entry.services.includes("Emergency care");
  const college = entry.name.startsWith("Madras Veterinary College");
  return {
    id: entry.city + "-" + slug, slug, name: entry.name, cityId: entry.city,
    type: entry.type as Provider["type"], area: entry.area, address: entry.address,
    phone: entry.phone || undefined, hours: { open24: entry.hours === "Open 24 hours" },
    hoursNote: entry.hours || undefined, specialtyIds: ["general", ...(emergency ? ["emergency"] : []), ...(/CT|Ultrasound|MRI/.test(entry.services.join(" ")) ? ["imaging"] : []), ...(entry.services.includes("Surgery") ? ["surgery"] : []), ...(entry.services.includes("Dental care") ? ["dentistry"] : [])],
    services: entry.services, species: [], amenities: [], verified: false, dataSource: "public",
    about: college ? "The teaching hospital at the Madras Veterinary College campus in Vepery offers outpatient consultations and round-the-clock emergency care for large and small animals." :
      entry.name.includes("Jivdaya") ? "The Ambawadi hospital treats unowned domestic animals and injured wildlife. Contact the trust about eligibility and intake before bringing an animal." :
      entry.name + " is listed in " + entry.area + ". " + (emergency ? "The published branch information describes emergency care. Call ahead to confirm the team can receive your pet." : "Check the linked branch information for appointments and current clinical services."),
    lastChecked: "2026-11-23", sources: directorySource ? { directory: entry.source } : { website: entry.source },
    evidence: [{ label: directorySource ? "Local practice listing" : "Provider or institution", url: entry.source }, { label: "Branch and location reference", url: entry.corroboration }],

  };
});
