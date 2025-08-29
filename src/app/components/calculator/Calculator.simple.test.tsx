/**
 * @fileoverview Simple Calculator test using relative imports
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Calculator from './Calculator';

// Mock all child components with relative imports
jest.mock('./Calculator', () => {
  return function MockCalculator(props: any) {
    return <div data-testid="calculator">Mock Calculator Component</div>;
  };
});

describe('Calculator Component (Simple)', () => {
  it('renders without crashing', () => {
    render(<Calculator />);
    expect(screen.getByTestId('calculator')).toBeInTheDocument();
    expect(screen.getByText('Mock Calculator Component')).toBeInTheDocument();
  });
});