/** Equal-weight mean of available platform scores. Counts are never pooled. */
export function summarizeRatings(ratings = []) {
  const unique = new Map();
  for (const rating of ratings) {
    if (rating.kind === 'republished' || !Number.isFinite(rating.score) || rating.score < 1 || rating.score > 5) continue;
    const previous = unique.get(rating.platform);
    if (!previous || rating.checkedAt > previous.checkedAt) unique.set(rating.platform, rating);
  }
  const sources = [...unique.values()];
  return { sources, platformCount: sources.length, average: sources.length ? sources.reduce((sum, r) => sum + r.score, 0) / sources.length : null };
}
