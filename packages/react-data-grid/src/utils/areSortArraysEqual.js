const shallowEqual    = require('fbjs/lib/shallowEqual');

const areSortArraysEqual = (a, b) => {
  // Handle multipleSortColumns option
  if (typeof a === 'undefined' && typeof b === 'undefined') {
    return true;
  }

  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (!shallowEqual(a[i], b[i])) {
      return false;
    }
  }

  return true;
};

module.exports = areSortArraysEqual;
