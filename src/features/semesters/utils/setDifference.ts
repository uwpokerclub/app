export function setDifference(setA: Set<string>, setB: Set<string>): Set<string> {
  const difference = new Set(setA);
  for (const e of Array.from(setB)) {
    difference.delete(e);
  }

  return difference;
}
