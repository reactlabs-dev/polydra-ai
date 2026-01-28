/**
 * Centralized Test Setup and Utilities
 * Provides reusable test helpers and configurations
 */
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AssessmentProvider } from '../app/context/AssessmentContext';

// Mock localStorage
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

// Global test setup
export const setupTestEnvironment = () => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });

  // Mock requestAnimationFrame
  global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
  global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Clear all mocks before each test
  jest.clearAllMocks();
  mockLocalStorage.clear();
};

// Custom render function with router wrapper
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withRouter?: boolean;
}

export const customRender = (
  ui: ReactElement,
  { withRouter = false, ...options }: CustomRenderOptions = {}
): RenderResult => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    let content = children;

    if (withRouter) {
      content = (
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          {content}
        </BrowserRouter>
      );
    }

    return <AssessmentProvider>{content}</AssessmentProvider>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Test data factories
export const createMockFactor = (overrides = {}) => ({
  name: 'Test Factor',
  score: 15,
  weight: 1,
  ...overrides,
});

export const createMockFactors = (count = 6) => {
  const factors = [];
  const names = [
    'Governance & Accountability',
    'Ethics & Responsible AI', 
    'Data Integrity & Security',
    'Model Quality & Technical Rigor',
    'Operationalization & Lifecycle Management',
    'Stakeholder & Societal Impact'
  ];

  for (let i = 0; i < count; i++) {
    factors.push(createMockFactor({
      name: names[i] || `Factor ${i + 1}`,
      score: Math.floor(Math.random() * 25),
    }));
  }
  
  return factors;
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };