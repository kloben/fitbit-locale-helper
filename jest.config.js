module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['node_modules', 'src/index.ts'],
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  maxConcurrency: 1
}
