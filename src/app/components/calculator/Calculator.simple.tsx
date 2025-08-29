/**
 * @fileoverview Simplified Calculator component for testing
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styles from './Calculator.module.scss';
import { Factor, initialFactors } from '../factorSlider/FactorSlider';
import CompositeScoreDisplay from '../compositeScoreDisplay/CompositeScoreDisplay';
import Visualization from '../visualization/Visualization';
import FactorSlider from '../factorSlider/FactorSlider';

export interface CalculatorProps {
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

/**
 * Enhanced Calculator component with comprehensive functionality
 */
const Calculator: React.FC<CalculatorProps> = ({ className, style, ...props }) => {
  // Initialize factors state with localStorage fallback
  const [factors, setFactors] = useState<Factor[]>(() => {
    try {
      const saved = localStorage.getItem('polydra-factors');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : initialFactors;
      }
    } catch {
      // Fall through to default
    }
    // Ensure we always return a valid array
    return initialFactors || [];
  });

  const calculateCompositeScore = () => {
    if (!factors || !Array.isArray(factors) || factors.length === 0) return 0;
    return factors.reduce((acc, factor) => acc + factor.score * factor.weight, 0);
  };

  const getMaturityLevel = (score: number) => {
    if (score >= 100) return { level: "Expert", color: "#ef4444", description: "World-class AI governance" };
    if (score >= 75) return { level: "Advanced", color: "#f97316", description: "Sophisticated AI practices" };
    if (score >= 50) return { level: "Intermediate", color: "#eab308", description: "Solid AI foundation" };
    if (score >= 25) return { level: "Basic", color: "#22c55e", description: "Initial AI practices" };
    return { level: "Developing", color: "#6b7280", description: "AI practices in early stages" };
  };

  const compositeScore = calculateCompositeScore();
  const maturity = getMaturityLevel(compositeScore);

  const handleScoreChange = (index: number, value: number) => {
    const newFactors = [...factors];
    newFactors[index].score = value;
    setFactors(newFactors);
    
    try {
      localStorage.setItem('polydra-factors', JSON.stringify(newFactors));
    } catch {
      // Ignore localStorage errors in tests
    }
  };

  return (
    <div 
      className={`${styles.calculator} ${className || ''}`}
      style={style}
      data-testid={props['data-testid'] || 'calculator'}
    >
      <div className="calculator-content">
        <CompositeScoreDisplay 
          score={compositeScore}
        />
        
        <div className="maturity-level" style={{ 
          padding: '16px 24px', 
          background: 'rgba(107, 114, 128, 0.125)', 
          border: '2px solid #6b7280', 
          borderRadius: '12px',
          maxWidth: '600px',
          margin: '16px auto'
        }}>
          <h3 style={{ margin: '0px 0px 8px 0px', color: maturity.color }}>
            AI Maturity Level: {maturity.level}
          </h3>
          <p style={{ margin: '0px', color: '#374151' }}>
            {maturity.description}
          </p>
        </div>
        
        <div className="factors-section">
          {factors.map((factor, index) => (
            <FactorSlider
              key={factor.name}
              factor={factor}
              onChange={(value) => handleScoreChange(index, value)}
            />
          ))}
        </div>
        
        <div className="visualization-section">
          <Visualization factors={factors} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;