/**
 * Mock for Cube3D component
 * Provides a simple implementation for testing
 */
import React from 'react';

interface MockCube3DProps {
  factors?: any[];
  [key: string]: any;
}

const MockCube3D: React.FC<MockCube3DProps> = ({ factors = [], ...props }) => {
  return (
    <div data-testid="cube3d-mock" {...props}>
      <div>Cube3D Mock</div>
      <div data-testid="cube3d-factors">Factors: {factors.length}</div>
      {/* Mock rotation controls */}
      <input 
        type="range" 
        data-testid="cube3d-horizontal-slider"
        min="0" 
        max="1" 
        step="0.01" 
        defaultValue="0.5"
      />
      <input 
        type="range" 
        data-testid="cube3d-vertical-slider"
        min="0" 
        max="1" 
        step="0.01" 
        defaultValue="0.5"
      />
    </div>
  );
};

export default MockCube3D;