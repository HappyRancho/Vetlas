import type { APIRoute } from "astro";
import { cities,providersByCity } from "../data";
export const GET: APIRoute = ({ site }) => new Response([
  "# Vetlas", "Veterinary care directories for ten Indian cities. Sources and check dates appear on facility profiles. Opening hours describe published schedules. Confirm urgent availability directly.",
  ...cities.map(c => "- ["+c.name+"]("+new URL(c.slug+"/", site)+") · "+providersByCity(c.id).length+" facilities"),
  "- [Publication methodology]("+new URL("methodology/",site)+")",
  "- [Directory records]("+new URL("directory.json",site)+")"
].join("\n\n"));
