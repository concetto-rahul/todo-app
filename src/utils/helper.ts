import { replace } from "lodash";
import numeral from "numeral";

export function getUniqueId(id = 0) {
  return new Date().getTime();
}

export function fShortenNumber(number: string | number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function isArrayEquals(a: any, b: any) {
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    a.sort();
    b.sort();
    return a.every((val, index) => val === b[index]);
  } else {
    return false;
  }
}
