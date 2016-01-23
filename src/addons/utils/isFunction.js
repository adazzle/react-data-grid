/* @flow */

const isFunction = function(functionToCheck: any): boolean {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

module.exports = isFunction;
