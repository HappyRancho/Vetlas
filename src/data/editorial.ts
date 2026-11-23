import type { MarkdownInstance } from "astro";
import images from "./editorial-images.json";
import sources from "./editorial-sources.json";
import { ownerArticles, shampooGuide } from "./owner-guides";
import { finds } from "./popular-finds";

type Desk = "guides" | "reads";
interface Metadata {
  title: string;
  description: string;
  topic: string;
  order: number;
  art: keyof typeof images;
  references: (keyof typeof sources)[];
}
export interface Cover {
  title: string;
  description: string;
  topic: string;
  image: string;
  srcset?: string;
  keywords?: string;
  href: string;
}
export interface Art {
  src: string;
  srcset?: string;
  alt: string;
  credit: string;
  source?: string;
  license?: string;
}
const searchAliases:Record<string,string> = {
  "dental-x-rays":"radiograph teeth dentistry",
  "ultrasound-or-xray":"radiograph scan x-ray xray",
  "diarrhoea-record-for-the-vet":"diarrhea loose stool vomiting dog",
  "cat-straining-to-urinate":"blocked bladder wee urine litter box emergency",
  "rabbit-stops-eating":"stasis droppings rabbit hay anorexia",
  "cat-carrier-visit":"transport travel appointment fear",
  "dog-seizure-first-minutes":"fit convulsion epilepsy",
  "tick-check-after-a-walk":"parasites tick removal dog walking",
  "cat-kidney-home-record":"renal CKD cat thirst",
  "reconstruct-vaccination-record":"puppy kitten vaccine shots immunisation",
  "checking-a-surgical-incision":"surgery stitches suture wound healing"
};
const files = import.meta.glob<MarkdownInstance<Metadata>>("../editorial/*/*.md", { eager: true });
export const features = Object.entries(files).map(([path, document]) => {
  const [, desk, slug] = path.match(/\/editorial\/(guides|reads)\/([^/]+)\.md$/)!;
  const { art, references, ...metadata } = document.frontmatter;
  const picture: Art = images[art];
  return { ...metadata, desk: desk as Desk, slug, href: `/${desk}/${slug}/`, image: picture.src, srcset:picture.srcset, keywords:[searchAliases[slug] ?? "", ...document.getHeadings().map(h=>h.text)].join(" "), picture,
    references: references.map(key => sources[key]), document };
}).sort((a,b) => a.order - b.order);
export type Feature = (typeof features)[number];
export const guides = features.filter(f => f.desk === "guides");
export const reads = features.filter(f => f.desk === "reads");
const ownerCover = (a: (typeof ownerArticles)[number]): Cover => ({
  title:a.title, description:a.description, topic:a.topic, image:a.image, href:`/care-guide/${a.slug}/`
});
export const olderGuides = ownerArticles.map(ownerCover);
export const shampooCover = ownerCover(shampooGuide);
export const shortlists: Cover[] = finds.map((f,i) => ({
  title:f.title, description:f.method.split(". ")[0]+".", topic:"Directory shortlist", href:f.href,
  image:["/specialities/directory.webp","/specialities/general.webp","/specialities/internal.webp","/specialities/surgery.webp"][i]
}));

const nationalEditions = new Set(["dog-foods-india","cat-foods-india","veterinary-surgeons-india","veterinary-referral-hospitals-india"]);
export const healthExplainers = reads.filter(article => !nationalEditions.has(article.slug));
export const popularEditions: Cover[] = [
  shampooCover, ...reads.filter(article => nationalEditions.has(article.slug)),
  ...shortlists.filter(article => article.href === "/finds/vet-clinics/"),
];
