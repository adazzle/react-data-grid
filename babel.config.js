'use strict';

module.exports = {
  presets: [
    ['@babel/env', {
      corejs: 3,
      useBuiltIns: 'entry'
    }]
  ],
  plugins: [
    ['@babel/transform-runtime', { useESModules: true }],
    '@babel/proposal-class-properties'
  ]
};
