import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
