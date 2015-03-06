/* @flow */
/**
 * @jsx React.DOM


 */
'use strict';

function shallowCloneObject(obj: any): any {
  var result = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      result[k] = obj[k];
    }
  }
  return result;
}

module.exports = shallowCloneObject;
