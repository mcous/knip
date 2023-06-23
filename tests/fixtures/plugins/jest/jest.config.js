/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...require('./jest.config.shared'),
  displayName: 'dev',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: [],
  moduleNameMapper: {
    '\\.(jpg|jpeg|...|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
