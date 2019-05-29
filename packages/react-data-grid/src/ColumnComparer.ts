import { isElement } from 'react-is';

export function sameColumn<A extends {}, B extends {}>(a: A, b: B): boolean {
  for (const k in a) {
    if (a.hasOwnProperty(k)) {
      const valA = a[k] as unknown;
      const valB = b[k as string as keyof B] as unknown;
      if ((typeof valA === 'function' && typeof valB === 'function') || (isElement(valA) && isElement(valB))) {
        continue;
      }
      if (!b.hasOwnProperty(k) || valA !== valB) {
        return false;
      }
    }
  }

  for (const k in b) {
    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
      return false;
    }
  }

  return true;
}
