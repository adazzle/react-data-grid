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
    'src/**/*.{ts,tsx}'
  ],
  coverageReporters: [
    'cobertura'
  ],
  restoreMocks: true,
  moduleNameMapper: {
    '^@material-ui/icons$': '<rootDir>/test/iconsMock.ts'
  },
  setupFiles: [
    '<rootDir>/test/setupTests.ts'
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.(ts|tsx)',
    '<rootDir>/tests/**/*.test.(ts|tsx)'
  ]
};
