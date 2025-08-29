/**
 * Global Mock Setup
 * Centralizes all component and library mocks for consistent testing
 */
import 'jest-canvas-mock';

// Import our custom mocks
import MockCube3D from './MockCube3D';

// Mock Three.js completely
jest.mock('three', () => require('./three'));

// Mock our Cube3D component
jest.mock('@/app/components/Cube3D', () => ({
  __esModule: true,
  default: MockCube3D,
}));

// Mock PrimeReact components
jest.mock('primereact/button', () => ({
  Button: require('./primereact').Button,
}));

jest.mock('primereact/inputnumber', () => ({
  InputNumber: require('./primereact').InputNumber,
}));

jest.mock('primereact/dialog', () => ({
  Dialog: require('./primereact').Dialog,
}));

jest.mock('primereact/progressbar', () => ({
  ProgressBar: require('./primereact').ProgressBar,
}));

jest.mock('primereact/slider', () => ({
  Slider: require('./primereact').Slider,
}));

// Mock CSS modules
jest.mock('*.module.scss', () => ({}));
jest.mock('*.module.css', () => ({}));

export {};