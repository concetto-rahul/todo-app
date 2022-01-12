import { replace } from "lodash";
import numeral from "numeral";

export function getUniqueId(id = 0) {
  return new Date().getTime();
}

export function fShortenNumber(number: string | number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}
