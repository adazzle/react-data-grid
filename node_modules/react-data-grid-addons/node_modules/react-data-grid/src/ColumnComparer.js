let isValidElement = require('react').isValidElement;

module.exports =
function sameColumn(a: Column, b: Column): boolean {
  let k;

  for (k in a) {
    if (a.hasOwnProperty(k)) {
      if ((typeof a[k] === 'function' && typeof b[k] === 'function') || (isValidElement(a[k]) && isValidElement(b[k]))) {
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
};
