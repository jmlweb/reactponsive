module.exports = {
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testEnvironment: 'jsdom',
  testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  coverageReporters: ['json', 'html', 'lcov', 'text-summary'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['jest-extended', './src/setupTests.ts'],
};
