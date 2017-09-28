const shallowEqual    = require('fbjs/lib/shallowEqual');

const areSortArraysEqual = (a, b) => {
  const typeA = typeof a;
  const typeB = typeof b;
  // Handle multipleSortColumns option
  if (typeA === 'undefined' && typeB === 'undefined') {
    return true;
  }

  if (typeA !== 'object' || typeB !== 'object' || a.constructor !== Array || b.constructor !== Array || a.length !== b.length) {
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
