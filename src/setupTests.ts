/**
 * @fileoverview Test setup configuration
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock the Cube3D component to avoid WebGL issues
jest.mock('./app/components/Cube3D', () => {
  const React = require('react');
  
  const MockCube3D: React.FC<any> = ({ factors }) => (
    React.createElement('div', {
      'data-testid': 'cube-3d-mock',
      'role': 'img',
      'aria-label': '3D Cube Visualization'
    }, [
      React.createElement('div', { 'data-testid': 'mock-scene', key: 'scene' }, 'Mock 3D Scene'),
      React.createElement('div', { 'data-testid': 'mock-factors-count', key: 'factors' }, `${factors?.length || 0} factors`)
    ])
  );
  
  return { default: MockCube3D };
});

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class MockResizeObserver {
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
}

window.ResizeObserver = MockResizeObserver as any;

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // Mock implementation
  }
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
}

window.IntersectionObserver = MockIntersectionObserver as any;

// Mock console for cleaner test output (preserve important methods)
const originalConsole = globalThis.console;
globalThis.console = {
  ...originalConsole,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
};

// Mock WebGL context for Three.js components
const mockCanvas = {
  getContext: jest.fn().mockReturnValue({
    clearColor: jest.fn(),
    clear: jest.fn(),
    clearDepth: jest.fn(),
    enable: jest.fn(),
    disable: jest.fn(),
    getParameter: jest.fn().mockReturnValue('WebGL'),
    drawElements: jest.fn(),
    drawArrays: jest.fn(),
    viewport: jest.fn(),
    createShader: jest.fn(),
    shaderSource: jest.fn(),
    compileShader: jest.fn(),
    createProgram: jest.fn(),
    attachShader: jest.fn(),
    linkProgram: jest.fn(),
    useProgram: jest.fn(),
  }),
  width: 300,
  height: 200,
  style: {},
};

// Mock HTMLCanvasElement
Object.defineProperty(window, 'HTMLCanvasElement', {
  writable: true,
  value: jest.fn().mockImplementation(() => mockCanvas),
});

// Mock WebGL context creation
HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  clearColor: jest.fn(),
  clear: jest.fn(),
  clearDepth: jest.fn(),
  enable: jest.fn(),
  disable: jest.fn(),
  getParameter: jest.fn().mockReturnValue('WebGL'),
  drawElements: jest.fn(),
  drawArrays: jest.fn(),
  viewport: jest.fn(),
  createShader: jest.fn(),
  shaderSource: jest.fn(),
  compileShader: jest.fn(),
  createProgram: jest.fn(),
  attachShader: jest.fn(),
  linkProgram: jest.fn(),
  useProgram: jest.fn(),
});