// https://jestjs.io/docs/configuration

export default {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/types.ts'],
  coverageReporters: ['json'],
  restoreMocks: true,
  setupFiles: ['./test/setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/**/*.test.*']
};
