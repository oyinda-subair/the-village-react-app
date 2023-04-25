export default {
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: false,
      useESM: true,
      babelConfig: true,
      plugins: ['babel-plugin-transform-vite-meta-env'],
    },
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'jest-preview/transforms/file',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.cjs',
    // '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@interface/(.*)$': '<rootDir>/src/interface/$1',
    '^@view/(.*)$': '<rootDir>/src/view/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@slices/(.*)$': '<rootDir>/src/redux/slices/$1',
    '^@services/(.*)$': '<rootDir>/src/redux/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$'],
};
