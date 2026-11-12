import { cities, specialties } from "./taxonomy";
import { providers, doctors } from "./seed";
import { cityById, specialtyById } from "./index";

export interface SearchEntry {
  kind: "city" | "specialty" | "facility" | "doctor";
  label: string;
  sub: string;
  href: string;
  keywords: string;
}

/**
 * Flat, client-friendly index for the universal search autocomplete.
 * Every entry points at an existing static route. No network requests.
 */
export const suggestionEntries: SearchEntry[] = [
  ...cities.map((city) => ({
    kind: "city" as const,
    label: city.name,
    sub: `${city.state} · city`,
    href: `/${city.slug}/`,
    keywords: `${city.name} ${city.state} ${city.slug} city location vets`.toLowerCase(),
  })),
  ...specialties.map((s) => ({
    kind: "specialty" as const,
    label: s.name,
    sub: s.tagline,
    href: `/specialties/${s.slug}/`,
    keywords: `${s.name} ${s.tagline} ${s.description} ${s.slug} speciality specialty`.toLowerCase(),
  })),
  ...providers.map((p) => {
    const city = cityById(p.cityId);
    const specs = p.specialtyIds.map((id) => specialtyById(id)?.name).filter(Boolean);
    return {
      kind: "facility" as const,
      label: p.name,
      sub: `${p.type === "hospital" ? "Hospital" : "Clinic"} · ${p.area}, ${city?.name ?? ""}`,
      href: `/${city?.slug}/${p.slug}/`,
      keywords: [
        p.name, p.area, city?.name, city?.state, p.type, ...specs,
        ...p.services, ...p.species, ...p.amenities,
      ].filter(Boolean).join(" ").toLowerCase(),
    };
  }),
  ...doctors.map((d) => {
    const city = cityById(d.cityId);
    const primary = specialtyById(d.primarySpecialtyId);
    const specs = [d.primarySpecialtyId, ...d.secondarySpecialtyIds]
      .map((id) => specialtyById(id)?.name)
      .filter(Boolean);
    return {
      kind: "doctor" as const,
      label: `Dr. ${d.name}`,
      sub: `${primary?.name ?? "Veterinarian"} · ${city?.name ?? ""}`,
      href: `/${city?.slug}/${d.slug}/`,
      keywords: [
        `Dr ${d.name}`, d.name, ...specs, city?.name, city?.state,
        ...d.degrees, ...d.species, ...d.languages, "doctor vet veterinarian",
      ].filter(Boolean).join(" ").toLowerCase(),
    };
  }),
];

export const kindLabels: Record<SearchEntry["kind"], string> = {
  city: "City",
  specialty: "Speciality",
  facility: "Care",
  doctor: "Doctor",
};
