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
