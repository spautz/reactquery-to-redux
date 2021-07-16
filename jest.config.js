/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],

  collectCoverage: true,
  coverageReporters: ['json', 'html', 'lcov'],
};
