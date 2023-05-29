module.exports = {
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    collectCoverage: true,
    coverageReporters: ['text', 'html'],
    coverageDirectory: '<rootDir>/coverage/',
    testTimeout: 10000
};