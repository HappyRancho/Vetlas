import { cities, specialties } from "@data";

export function pageFamily(path: string) {
  const [section, child, profile] = path.split("/").filter(Boolean);
  if (!section) return "home";
  if (section==="404" || section==="404.html") return "missing";
  if (["guides","care-guide"].includes(section)) return "guides";
  if (["reads","finds"].includes(section)) return "press";
  if (section==="emergency") return "urgent";
  if (section==="map" || section==="locations") return "places";
  if (section==="doctors" || section==="specialists") return "people";
  if (section==="specialties") return "specialities";
  if (cities.some(c=>c.slug===section)) {
    if (!child) return "places";
    if (child==="veterinarians") return profile ? "doctor" : "people";
    return specialties.some(s=>s.slug===child) ? "specialities" : "practice";
  }
  if (["search","hospitals","clinics"].includes(section)) return "directory";
  if (section==="more") return "tools";
  if (section==="review") return "review";
  return "information";
}
