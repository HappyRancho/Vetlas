import { veterinarians } from "../data/veterinarians";
import { doctors } from "../data";
export function GET(){
  return Response.json({version:2,scope:"Published veterinarian profiles",veterinarians:[...veterinarians,...doctors].map(v=>({...v,url:`/${v.cityId}/veterinarians/${v.slug}/`}))});
}
