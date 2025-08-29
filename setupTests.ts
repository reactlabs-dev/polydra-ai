/**
 * Jest Setup Configuration
 * Runs before all tests to configure the testing environment
 */
import '@testing-library/jest-dom';
import { setupTestEnvironment } from './src/test-utils/index';
import './src/__mocks__/setup';

// Configure test environment
setupTestEnvironment();

// Run setup before each test
beforeEach(() => {
  setupTestEnvironment();
});