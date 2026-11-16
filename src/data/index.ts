import { cities, specialties } from "./taxonomy";
import { providers as seedProviders, doctors as seedDoctors, reviews, costEstimates } from "./seed";
import { puneProviders, puneDoctors, puneLocalities } from "./pune";
import type { City, Specialty, Provider, Doctor, Review, ReviewTheme } from "./types";

export * from "./types";
export { cities, specialties };
export { puneLocalities };

/**
 * Merged directory: the clearly-marked sample dataset plus real public-source
 * records (Pune & PCMC research batch 1). Every record keeps its own
 * dataSource / trust labels, so pages can present both honestly.
 */
export const providers: Provider[] = [...seedProviders, ...puneProviders];
export const doctors: Doctor[] = [...seedDoctors, ...puneDoctors];
export { reviews, costEstimates };

/* ------------------------------------------------------------------ */
/* Lookup helpers — the only surface pages should touch for data.      */
/* Swapping this module for a live database (e.g. Neon + Drizzle)      */
/* requires no page-level changes.                                     */
/* ------------------------------------------------------------------ */

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getSpecialty(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}

export function getProvider(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function providersByCity(cityId: string): Provider[] {
  return providers.filter((p) => p.cityId === cityId);
}

export function doctorsByCity(cityId: string): Doctor[] {
  return doctors.filter((d) => d.cityId === cityId);
}

export function providersBySpecialty(specialtyId: string): Provider[] {
  return providers.filter((p) => p.specialtyIds.includes(specialtyId));
}

export function doctorsBySpecialty(specialtyId: string): Doctor[] {
  return doctors.filter(
    (d) => d.primarySpecialtyId === specialtyId || d.secondarySpecialtyIds.includes(specialtyId)
  );
}

export function providerReviews(providerSlug: string): Review[] {
  return reviews
    .filter((r) => r.targetSlug === providerSlug && r.targetType === "provider")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function doctorReviews(doctorSlug: string): Review[] {
  return reviews
    .filter((r) => r.targetSlug === doctorSlug && r.targetType === "doctor")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function cityById(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}

export function specialtyById(id: string): Specialty | undefined {
  return specialties.find((s) => s.id === id);
}

/** Providers a given doctor practises at */
export function doctorsProviders(doctor: Doctor): Provider[] {
  return doctor.providerSlugs
    .map((slug) => getProvider(slug))
    .filter((p): p is Provider => Boolean(p));
}

/** Doctors associated with a given provider */
export function providersDoctors(provider: Provider): Doctor[] {
  return doctors.filter((d) => d.providerSlugs.includes(provider.slug));
}

/**
 * Distinct localities (areas) covered within a city, with provider counts.
 * Derived from live data — no parallel list to maintain.
 */
export function areasByCity(cityId: string): { area: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of providers) {
    if (p.cityId !== cityId) continue;
    counts.set(p.area, (counts.get(p.area) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count || a.area.localeCompare(b.area));
}

/**
 * Publication gate (README "publication gates" / spec §2): a city page becomes
 * indexable once it holds enough *vetted* profiles (Vetlas-verified or
 * provider-confirmed). Public-source research records do not count as vetted,
 * so gates stay closed until verification passes run — by design.
 */
export function cityPublishGate(cityId: string) {
  const city = cityById(cityId);
  const p = providers.filter((x) => x.cityId === cityId);
  const d = doctors.filter((x) => x.cityId === cityId);
  const total = p.length + d.length;
  const vetted =
    p.filter((x) => x.verified || x.dataSource === "provider-confirmed").length +
    d.filter((x) => x.verified || x.dataSource === "provider-confirmed").length;
  const minimum = city?.isMetro ? 30 : 15;
  return {
    city,
    providers: p,
    doctors: d,
    totalProfiles: total,
    vettedProfiles: vetted,
    minimumVetted: minimum,
    indexable: vetted >= minimum,
  };
}

export function feeINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function feeRangeINR(min: number, max: number): string {
  return `₹${min.toLocaleString("en-IN")}–₹${max.toLocaleString("en-IN")}`;
}

/**
 * Derive review themes (mirrors the review_theme table in db/schema.sql):
 * count review tags across a review list, most-mentioned first.
 */
export function deriveReviewThemes(list: Review[]): ReviewTheme[] {
  const counts = new Map<string, number>();
  for (const r of list) {
    for (const tag of r.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([theme, reviewCount]) => ({ sentiment: "positive" as const, theme, reviewCount }));
}

/** Human-readable label for a trust level (mirrors db/schema.sql enum; kebab = badge class) */
export const trustLabels: Record<string, string> = {
  "sample": "Sample data",
  "verified": "Verified by Vetlas",
  "provider-confirmed": "Provider confirmed",
  "public": "Public source",
  "user-submitted": "User submitted",
  "estimated": "Estimated (system-calculated)",
};
