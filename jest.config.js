// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/types.ts'
  ],
  coverageReporters: [
    'text'
  ],
  restoreMocks: true,
  setupFiles: [
    './test/setup.ts'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom'
  ],
  testMatch: [
    '<rootDir>/test/**/*.test.*'
  ]
};
