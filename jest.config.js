'use strict';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  moduleNameMapper: {
    '\\.css$': '<rootDir>/test/fileMock.js'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/package.json'
  ],
  setupFiles: ['<rootDir>/test/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/packages/*/src/**/*.spec.(js|ts|tsx)',
    '<rootDir>/examples/**/*.spec.(js|ts|tsx)'
  ]
};
