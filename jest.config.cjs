'use strict';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: {
        esModuleInterop: true
      }
    }
  },
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coverageReporters: [
    'text'
  ],
  restoreMocks: true,
  moduleNameMapper: {
    '^@material-ui/icons$': '<rootDir>/jest/iconsMock.ts'
  },
  setupFiles: [
    '<rootDir>/jest/setupTests.ts'
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.*'
  ]
};
