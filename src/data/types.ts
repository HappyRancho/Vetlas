/**
 * Vetlas data model.
 *
 * The platform separates three entities: veterinary facilities ("providers"),
 * veterinary doctors, and the specialty taxonomy that links both.
 *
 * `dataSource` explicitly marks every record as "sample" (demo content) or
 * "community" (user-submitted) or "verified" (checked by the Vetlas team).
 * We never present sample data as verified real-world information.
 */

export type DataSource = "sample" | "community" | "verified";

/**
 * Per-fact trust levels, mirroring db/schema.sql (Cloudflare D1 v0.3).
 * `sample` is a UI-only level for the demo dataset; real deployments use
 * the levels from the schema. Kebab-case values double as CSS badge classes
 * (spec §7: geometric shapes + colour per tier).
 */
export type TrustLevel =
  | "sample"
  | "verified"
  | "provider-confirmed"
  | "public"
  | "user-submitted"
  | "estimated";

export interface City {
  id: string;
  slug: string;
  name: string;
  state: string;
  isMetro: boolean;
}

export interface Specialty {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Key into the shared inline icon set */
  icon: string;
}

export type ProviderType = "hospital" | "clinic";

export interface ConsultationFee {
  /** Standard OPD / walk-in consultation, INR */
  opd: number;
  /** Emergency / after-hours consultation, INR (optional) */
  emergency?: number;
  /** How well-attested the fee is (mirrors consultation_fee.trust_level) */
  trustLevel: TrustLevel;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  type: ProviderType;
  cityId: string;
  area: string;
  address: string;
  phone: string;
  /** 24-hour clock, e.g. { open: "09:00", close: "20:30" }; open24 true means round the clock */
  hours: { open24: boolean; open?: string; close?: string };
  specialtyIds: string[];
  /** Animal species this provider treats (sample labels for the demo dataset) */
  species: string[];
  services: string[];
  amenities: string[];
  fees: ConsultationFee;
  /** Average rating out of 5; sample-data ratings are illustrative only */
  rating: number;
  reviewCount: number;
  establishedYear: number;
  about: string;
  verified: boolean;
  dataSource: DataSource;
  /** Optional future real facility photograph; absent records use the illustrated fallback. */
  imageUrl?: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  prefix: "Dr.";
  degrees: string[];
  /** Sample registration number format, clearly marked in UI when sample */
  registration?: string;
  experienceYears: number;
  cityId: string;
  primarySpecialtyId: string;
  secondarySpecialtyIds: string[];
  /** Species this doctor treats (sample labels for the demo dataset) */
  species: string[];
  /** Slugs of providers the doctor practises at */
  providerSlugs: string[];
  consultationFee: number;
  languages: string[];
  about: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  dataSource: DataSource;
  /** Optional future real doctor photograph; absent records use the initials fallback. */
  imageUrl?: string;
}

export interface Review {
  id: string;
  /** Target: provider or doctor slug */
  targetSlug: string;
  targetType: "provider" | "doctor";
  author: string;
  rating: number;
  /** ISO date */
  date: string;
  text: string;
  tags: string[];
  dataSource: DataSource;
  /** Mirrors review.trust_level in db/schema.sql */
  trustLevel: TrustLevel;
}

export interface ReviewTheme {
  sentiment: "positive" | "negative";
  theme: string;
  reviewCount: number;
}

export interface CostEstimateItem {
  id: string;
  name: string;
  category: "consultation" | "medicine" | "vaccination" | "procedure" | "diagnostics";
  /** Typical low price in INR */
  min: number;
  /** Typical high price in INR */
  max: number;
  note?: string;
  dataSource: DataSource;
}
