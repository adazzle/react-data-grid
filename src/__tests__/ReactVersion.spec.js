'use strict';
var React  = require('react');
var semver = require('semver');

describe('React Version Tests', () => {

  it('should use React 14', () => {
    var usingReact14 = semver.gt(React.version, "0.14.0");
    expect(usingReact14).toBe(true);
  });

});
