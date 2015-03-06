/* @flow */
"use strict";

var isFunction = function(functionToCheck: any): boolean{
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = isFunction;
