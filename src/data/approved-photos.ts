// Each key identifies the photographed branch or practitioner. Add an entry
// only after checking the subject, reuse terms and the local image asset.
const approved: Record<string, { imageUrl: string; imageAlt: string; imageSourceUrl: string; imageCredit: string; imageLicenseUrl: string }> = {
  "chennai-madras-veterinary-college-teaching-hospital-tanuvas-vepery": {
    imageUrl: "/facilities/madras-veterinary-college.webp",
    imageAlt: "Madras Veterinary College campus in Vepery, Chennai",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Madras_Veterinary_College.jpg",
    imageCredit: "சத்திரத்தான் · CC BY-SA 4.0 · resized WebP",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  }
};

export function withApprovedPhotos<T extends { id: string }>(records: T[]) {
  return records.flatMap(record => {
    const photo = approved[record.id];
    return photo ? [{ ...record, ...photo }] : [];
  });
}

import branchPhotos from "./branch-photo-links.json";
import indorePhotos from "./facility-photos.json";
import punePhotos from "./pune-photos.json";
import type { Provider } from "./types";

export function facilitiesWithPhotos(records: Provider[]): Provider[] {
  const links = new Map<string, { url: string; source: string; caption?: string }>(Object.entries(branchPhotos));
  for (const [key, photo] of Object.entries({ ...indorePhotos, ...punePhotos.providers })) {
    links.set(key, { url: photo.imageOriginalUrl, source: photo.imageSourceUrl });
  }
  return records.flatMap<Provider>(record => {
    if (approved[record.id]) return [{ ...record, ...approved[record.id] }];
    const link = links.get(record.id) ?? links.get(record.slug);
    if (!link) return [];
    const credit = new URL(link.source).hostname.replace(/^www\./, "");
    return [{
      ...record,
      imageUrl: "/facilities/" + record.id + ".webp",
      imageAlt: link.caption ?? record.imageAlt ?? ("Photo from the listing for " + record.name + ", " + record.area),
      imageCredit: link.caption ? link.caption + " · " + credit : credit,
      imageSourceUrl: link.source,
      imageOriginalUrl: link.url
    }];
  });
}
