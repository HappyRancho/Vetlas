import type { PlatformRating } from './types';
// Observed source snapshots, not a claim of live platform access or unique reviewers.
export const platformRatings: Record<string, PlatformRating[]> = {
  'indore-myra-usha': [
    { platform: 'Practo', score: 4.5, count: 108, countLabel: 'patient stories', kind: 'platform', checkedAt: '2026-11-15', access: 'search-index', note: 'Indexed snapshot; source crawled within the past month. Platform freshness is not guaranteed.', url: 'https://www.practo.com/indore/clinic/myra-pet-clinic-surgery-centre-indore-nagar' },
    { platform: 'Justdial', score: 4.1, count: 582, countLabel: 'ratings', kind: 'cross-web', checkedAt: '2026-11-15', access: 'search-index', note: 'Indexed snapshot crawled about five months before checking. Justdial scores may include ratings from across the web.', url: 'https://www.justdial.com/Indore/Myra-Pet-Clinic-Surgery-Centre-Behind-Chhatrapati-Shivaji-School-Annapurna-Road/0731PX731-X731-140915110927-V2U9_BZDET' },
  ],
  'indore-royal-ganeshganj': [
    { platform: 'Justdial', score: 4.9, count: 203, countLabel: 'ratings', kind: 'cross-web', checkedAt: '2026-11-15', access: 'search-index', note: 'Indexed snapshot crawled about five months before checking. Justdial describes this as its rating index across the web.', url: 'https://www.justdial.com/Indore/Royal-Vet-Clinic-and-Surgery-Centre-Bana-Ganpati-Raj-Mohalla/0731PX731-X731-190926025616-J4B1_BZDET/reviews' },
  ],
};
