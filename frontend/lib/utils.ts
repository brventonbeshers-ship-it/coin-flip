export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr || "---";
  return addr.slice(0, 5) + "..." + addr.slice(-4);
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function sideLabel(side: number): string {
  if (side === 1) return "HEADS";
  if (side === 2) return "TAILS";
  return "WAITING";
}
// rep-utils-lib: 1775871830440
// rep-utils-lib: 1775920587926
// rep-utils-lib: 1775966951812
// rep-utils-lib: 1776046798202
// rep-utils-lib: 1776063151850
// rep-utils-lib: 1776084540151
// rep-utils-lib: 1776116648335
// rep-utils-lib: 1776144204630
// rep-utils-lib: 1776171134803
// rep-utils-lib: 1776186516072
// rep-utils-lib: 1776215439977
// rep-utils-lib: 1776248241539
// rep-utils-lib: 1776256882300
// rep-utils-lib: 1776316194653
// rep-utils-lib: 1776331415575
