// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coverageReporters: [
    'text'
  ],
  restoreMocks: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom'
  ],
  testMatch: [
    '<rootDir>/test/**/*.test.*'
  ]
};
