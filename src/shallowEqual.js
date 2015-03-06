/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

function shallowEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  var k;

  for (k in a) {
    if (a.hasOwnProperty(k) &&
        (!b.hasOwnProperty(k) || a[k] !== b[k])) {
      return false;
    }
  }

  for (k in b) {
    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
