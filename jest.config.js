module.exports = {
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testEnvironment: 'jsdom',
  testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ["json", "html"],
  coverageDirectory: './reports/coverage'
};
