import { providers,providersDoctors } from "../data";
import { vetsForFacility } from "../data/veterinarians";
import { summarizeRatings } from "../lib/ratings.mjs";
export function GET() {
  const facilities = providers.map(p => ({
    ...p, url: `/${p.cityId}/${p.slug}/`,
    veterinarianProfiles: [...vetsForFacility(p.id), ...providersDoctors(p)].map(d=>({name:d.name,url:`/${p.cityId}/veterinarians/${d.slug}/`})),
    platformRatingSummary: summarizeRatings(p.platformRatings)
  }));
  return Response.json({version:6,scope:"Published ten-city directory",facilities});
}
