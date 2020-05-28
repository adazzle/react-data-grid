// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
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
  setupFiles: [
    '<rootDir>/jest/setupTests.ts'
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.*'
  ]
};
