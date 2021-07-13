/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/', '<rootDir>/demos/todo-list/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/__tests__/_.*', '/node_modules/'],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],
};
