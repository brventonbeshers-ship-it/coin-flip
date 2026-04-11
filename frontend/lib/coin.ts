export function toCoinSide(value: number) {
  return value === 2 ? "TAILS" : "HEADS";
}

export function sideAccent(value: number) {
  return value === 2 ? "text-[#d8fff3]" : "text-[#79f2c0]";
}
