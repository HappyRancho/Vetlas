import type { Provider } from "../data/types";

export function comparisonFor(provider: Provider, providers: Provider[]) {
  if (provider.fees || provider.consultationListing || !["clinic","hospital"].includes(provider.type)) return;
  const eligible = providers.filter(p => p.type === provider.type && p.fees?.opd && p.dataSource === "public");
  const local = eligible.filter(p => p.cityId === provider.cityId);
  const distinct = (list: Provider[]) => {
    const brands = new Set<string>();
    return list.filter(p => {
      const brand = p.name.startsWith("Vetic ") ? "Vetic" : p.name;
      if (brands.has(brand)) return false;
      brands.add(brand);
      return true;
    });
  };
  const localOnly = distinct(local).length >= 2;
  const peers = distinct(localOnly ? local : [...local,...eligible]);
  if (peers.length < 2) return;
  const sorted = peers.sort((a,b) => a.fees!.opd-b.fees!.opd);
  const low = sorted[0], high = sorted[sorted.length-1];
  const samePrice = low.fees!.opd === high.fees!.opd;
  // Equal published figures give no observed spread. Show the planning allowance explicitly.
  const lower = samePrice ? Math.floor(low.fees!.opd * 0.75 / 50) * 50 : low.fees!.opd;
  const upper = samePrice ? Math.ceil(high.fees!.opd * 1.25 / 50) * 50 : high.fees!.opd;
  return { low, high, count: peers.length, localOnly, samePrice, amount: '₹'+lower+'–₹'+upper };
}
