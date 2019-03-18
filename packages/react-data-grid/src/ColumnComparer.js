import { isElement } from 'react-is';

export function sameColumn(a, b) {
  let k;

  for (k in a) {
    if (a.hasOwnProperty(k)) {
      if ((typeof a[k] === 'function' && typeof b[k] === 'function') || (isElement(a[k]) && isElement(b[k]))) {
        continue;
      }
      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
        return false;
      }
    }
  }

  for (k in b) {
    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
      return false;
    }
  }

  return true;
}
