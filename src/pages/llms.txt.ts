import type { APIRoute } from "astro";
import { ownerArticles } from "../data/owner-guides";
import { features } from "../data/editorial";
import { finds } from "../data/popular-finds";
import { cities,providersByCity } from "../data";
export const GET: APIRoute = ({ site }) => new Response([
  "# Vetlas", "Veterinary care directories for ten Indian cities. Sources and check dates appear on facility profiles. Opening hours describe published schedules. Confirm urgent availability directly.",
  ...cities.map(c => "- ["+c.name+"]("+new URL(c.slug+"/", site)+") · "+providersByCity(c.id).length+" facilities"),
  "- [Popular reads]("+new URL("reads/",site)+") · Veterinary newspaper and directory shortlists.",
  ...features.map(a => `- [${a.title}](${new URL(a.href,site)}) · ${a.description}`),
  ...ownerArticles.map(a => `- [${a.title}](${new URL("care-guide/"+a.slug+"/",site)}) · ${a.description}`),
  ...finds.map(f => `- [${f.title}](${new URL(f.href,site)}) · ${f.method}`),
  "- [Veterinary specialities]("+new URL("specialties/",site)+") · Browse care by speciality, prepare for a visit, and find local facilities and doctors.",
  "- [Directory tools]("+new URL("more/",site)+")",
  "- [Animal owner and referral guide]("+new URL("care-guide/",site)+")",
  "- [Veterinarian profiles]("+new URL("veterinarians.json",site)+")",
  "- [Publication methodology]("+new URL("methodology/",site)+")",
  "- [Directory records]("+new URL("directory.json",site)+")"
].join("\n\n"));
