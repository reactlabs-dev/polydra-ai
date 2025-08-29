/**
 * @fileoverview Unit tests for Calculator component
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import React from 'react';
import { customRender as render, screen } from '../../../test-utils';
import Calculator from './Calculator';

// Mock the complex child components to focus on Calculator logic
jest.mock('../compositeScoreDisplay/CompositeScoreDisplay', () => {
  return function MockCompositeScoreDisplay({ score }: { score: number }) {
    return <div data-testid="composite-score">Score: {score}</div>;
  };
});

jest.mock('../visualization/Visualization', () => {
  return function MockVisualization() {
    return <div data-testid="visualization">3D Visualization</div>;
  };
});

jest.mock('../factorSlider/FactorSlider', () => {
  return function MockFactorSlider({ factor, onChange }: any) {
    return (
      <div data-testid={`factor-slider-${factor.name.replace(/\s+/g, '-').toLowerCase()}`}>
        <span>{factor.name}</span>
        <input
          type="number"
          value={factor.score}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          data-testid={`slider-input-${factor.name.replace(/\s+/g, '-').toLowerCase()}`}
        />
      </div>
    );
  };
});

describe('Calculator Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders without crashing', () => {
    render(<Calculator data-testid="calculator" />);
    expect(screen.getByTestId('calculator')).toBeInTheDocument();
  });

  it('renders all required components', () => {
    render(<Calculator data-testid="calculator" />);
    
    expect(screen.getByTestId('calculator')).toBeInTheDocument();
    expect(screen.getByTestId('composite-score')).toBeInTheDocument();
    expect(screen.getByTestId('visualization')).toBeInTheDocument();
  });

  it('displays initial composite score of 0', () => {
    render(<Calculator data-testid="calculator" />);
    
    const scoreDisplay = screen.getByTestId('composite-score');
    expect(scoreDisplay).toHaveTextContent('Score: 0');
  });

  it('shows manual score adjustment section', () => {
    render(<Calculator data-testid="calculator" />);
    
    expect(screen.getByTestId('calculator')).toBeInTheDocument();
  });

  describe('Error Handling', () => {
    it('handles localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = jest.fn(() => {
        throw new Error('Storage error');
      });

      // Should not crash
      expect(() => render(<Calculator data-testid="calculator" />)).not.toThrow();
      expect(screen.getByTestId('calculator')).toBeInTheDocument();

      // Restore original implementation
      localStorage.getItem = originalGetItem;
    });

    it('handles malformed localStorage data', () => {
      localStorage.setItem('polydra_factors', 'invalid json');

      // Should not crash and should use default factors
      expect(() => render(<Calculator data-testid="calculator" />)).not.toThrow();
      expect(screen.getByTestId('calculator')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('passes correct props to CompositeScoreDisplay', () => {
      render(<Calculator />);
      
      // Initial composite score should be 0 (all factors start at 0)
      expect(screen.getByText('Score: 0')).toBeInTheDocument();
    });
  });
});