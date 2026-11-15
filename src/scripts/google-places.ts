import { summarizeRatings } from '../lib/ratings.mjs';
import type { PlatformRating } from '../data/types';
interface Photo { getURI(options: {maxWidth: number}): string; authorAttributions: {displayName: string; uri?: string}[]; }
interface PlaceResult { photos?: Photo[]; rating?: number; userRatingCount?: number; googleMapsURI?: string; fetchFields(options: {fields: string[]}): Promise<unknown>; }
interface PlacesLibrary { Place: new (options: {id: string}) => PlaceResult; }
type MapsWindow = Window & { google?: {maps: {importLibrary(name: string): Promise<PlacesLibrary>}}; vetlasGoogleReady?: () => void };
let library: Promise<PlacesLibrary> | undefined;
const requests = new Map<string, Promise<PlaceResult>>();
function loadLibrary(key: string): Promise<PlacesLibrary> {
  if (library) return library;
  const win = window as MapsWindow;
  library = new Promise<void>((resolve, reject) => {
    if (win.google?.maps?.importLibrary) { resolve(); return; }
    const timeout = window.setTimeout(() => reject(new Error('Google Maps timed out')), 15000);
    win.vetlasGoogleReady = () => { clearTimeout(timeout); resolve(); };
    const script = document.createElement('script');
    const params = new URLSearchParams({key, loading: 'async', callback: 'vetlasGoogleReady', v: 'weekly'});
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    script.onerror = () => { clearTimeout(timeout); reject(new Error('Google Maps unavailable')); };
    document.head.appendChild(script);
  }).then(() => win.google!.maps.importLibrary('places'));
  return library;
}
function safeLink(url?: string): string | undefined {
  try { const value = new URL(url ?? ''); return value.protocol === 'https:' ? value.href : undefined; } catch { return undefined; }
}
function updateRatings(providerId: string, place: PlaceResult) {
  if (!Number.isFinite(place.rating) || place.rating! < 1 || place.rating! > 5) return;
  const url = safeLink(place.googleMapsURI);
  if (!url) return;
  const rating: PlatformRating = {platform:'Google Maps',score:place.rating!,count:place.userRatingCount,countLabel:'ratings',kind:'platform',checkedAt:new Date().toISOString().slice(0,10),access:'api',url};
  document.querySelectorAll<HTMLElement>('[data-rating-provider]').forEach(element => {
    if (element.dataset.ratingProvider !== providerId) return;
    const prior: PlatformRating[] = JSON.parse(element.dataset.ratingInput || '[]');
    const summary = summarizeRatings([...prior.filter(r => r.platform !== 'Google Maps'),rating]);
    const label = `${summary.average!.toFixed(1)}/5 · ${summary.platformCount === 1 ? '1 platform' : `${summary.platformCount} platform avg`}`;
    const row = element.closest<HTMLElement>('.discovery-result'); if (row) row.dataset.rating = String(summary.average);
    const value = element.querySelector('[data-rating-value]');
    if (!value) { element.textContent = `★ ${label}`; return; }
    value.textContent = label;
    const coverage = element.querySelector('[data-rating-coverage]');
    if (coverage) coverage.textContent = 'Includes live Google Maps data and available source snapshots; coverage is incomplete. Reddit has no comparable star score.';
    const sources = element.querySelector('[data-rating-sources]');
    sources?.querySelector('[data-google-rating]')?.remove();
    const item = document.createElement('li'); item.dataset.googleRating = '';
    const link = document.createElement('a'); link.href=url; link.target='_blank'; link.rel='noopener noreferrer'; link.textContent=`Google Maps · ${rating.score.toFixed(1)}/5 →`;
    const detail = document.createElement('span'); detail.textContent=`${rating.count !== undefined ? `${rating.count} ratings · ` : ''}Live on ${rating.checkedAt}`;
    item.append(link,detail); sources?.append(item);
  });
}
async function fillPlace(element: HTMLElement) {
  try {
    const id = element.dataset.googlePlace!;
    if (!requests.has(id)) requests.set(id, loadLibrary(element.dataset.googleKey!).then(async ({Place}) => {
      const place = new Place({id});
      await place.fetchFields({fields:['photos','rating','userRatingCount','googleMapsURI']});
      return place;
    }));
    const place = await requests.get(id)!;
    updateRatings(element.dataset.providerId!, place);
    const photo = place.photos?.[0];
    if (!photo) return;
    const image = element.querySelector<HTMLImageElement>('[data-photo-image]')!;
    const figure = element.querySelector<HTMLElement>('[data-google-photo]')!;
    const fallback = element.querySelector<HTMLElement>('[data-photo-fallback]')!;
    const credits = element.querySelector('[data-photo-credits]')!;
    for (const author of photo.authorAttributions ?? []) {
      const href = safeLink(author.uri);
      const credit = document.createElement(href ? 'a' : 'span');
      credit.textContent = `Photo: ${author.displayName}`;
      if (credit instanceof HTMLAnchorElement) { credit.href=href!; credit.target='_blank'; credit.rel='noopener noreferrer'; }
      credits.append(credit,document.createTextNode(' '));
    }
    image.onload=() => { fallback.hidden=true; figure.hidden=false; };
    image.onerror=() => { figure.hidden=true; fallback.hidden=false; };
    image.loading='eager'; // IntersectionObserver already limits requests; a hidden lazy image never loads.
    image.src=photo.getURI({maxWidth:900});
  } catch { /* Keep usable, honest fallbacks on missing key, quota, network or API failure. */ }
}
export function initializeGooglePlaces() {
  const elements = document.querySelectorAll<HTMLElement>('[data-google-place]:not([data-google-initialized])');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { observer.unobserve(entry.target); void fillPlace(entry.target as HTMLElement); }
  }, {rootMargin:'100px'});
  elements.forEach(element => { element.dataset.googleInitialized=''; observer.observe(element); });
}
