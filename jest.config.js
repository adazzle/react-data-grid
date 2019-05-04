'use strict';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: {
        esModuleInterop: true
      }
    }
  },
  collectCoverage: process.env.CI === 'true',
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}'
  ],
  clearMocks: true,
  moduleNameMapper: {
    '^react-data-grid$': '<rootDir>/packages/react-data-grid/src/',
    '^react-data-grid-addons$': '<rootDir>/packages/react-data-grid-addons/src/'
  },
  setupFilesAfterEnv: ['react-testing-library/cleanup-after-each'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/tests/**/*.test.(ts|tsx)'
  ]
};
