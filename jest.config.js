export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/app/pages/$1',
    '^@/types$': '<rootDir>/src/types/index',
    '^@/constants$': '<rootDir>/src/constants/index',
    '^@/utils$': '<rootDir>/src/utils/index',
    '^@/hooks$': '<rootDir>/src/hooks/index',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Additional aliases for better coverage
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/app/pages/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/setupTests.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)'
  ],
};