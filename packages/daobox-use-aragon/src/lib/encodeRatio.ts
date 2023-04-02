export function encodeRatio(ratio: number, digits: number): number {
  if (ratio < 0 || ratio > 1) {
    throw new Error("The ratio value should range between 0 and 1");
  } else if (!Number.isInteger(digits) || digits < 1 || digits > 15) {
    throw new Error("The number of digits should range between 1 and 15");
  }
  return Math.round(ratio * 10 ** digits);
}
