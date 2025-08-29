/**
 * @fileoverview Enhanced Calculator component with improved error handling and documentation
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import React, { useState, useCallback, useMemo } from 'react';
import styles from './Calculator.module.scss';
import { Factor, initialFactors } from '@/components/factorSlider/FactorSlider';
import CompositeScoreDisplay from '@/components/compositeScoreDisplay/CompositeScoreDisplay';
import Visualization from '@/components/visualization/Visualization';
import FactorSlider from '@/components/factorSlider/FactorSlider';
import { AssessmentMath, A11yUtils } from '@/utils';
import { A11Y_LABELS, MATURITY_LEVELS } from '@/constants';
import ErrorBoundary from '@/components/common/ErrorBoundary';

/**
 * Props interface for the Calculator component
 */
export interface CalculatorProps {
  /** CSS class name override */
  className?: string;
  /** Inline style override */
  style?: React.CSSProperties;
  /** Test identifier for automated testing */
  'data-testid'?: string;
  /** Whether to show advanced controls */
  showAdvancedControls?: boolean;
}

/**
 * Enhanced Calculator Component with enterprise-grade features
 * 
 * Provides a comprehensive interface for AI assessment including:
 * - Interactive factor scoring via sliders and questionnaire
 * - Real-time composite score calculation with validation
 * - Maturity level visualization with progress tracking
 * - 3D cube visualization of assessment dimensions
 * - Accessibility features and keyboard navigation
 * - Error handling and data persistence
 * 
 * @component
 * @example
 * ```tsx
 * <Calculator 
 *   showAdvancedControls={true}
 *   data-testid="main-calculator"
 * />
 * ```
 */
export function Calculator({
  className,
  style,
  'data-testid': testId = 'calculator',
  showAdvancedControls = false,
}: CalculatorProps) {
  // State management with validation
  const [factors, setFactors] = useState<Factor[]>(() => {
    // Try to load from localStorage, fallback to defaults
    try {
      const saved = localStorage.getItem('polydra_factors');
      if (saved) {
        const parsed = JSON.parse(saved) as Factor[];
        // Validate each factor before using
        const validFactors = parsed.filter(factor => 
          typeof factor.name === 'string' &&
          typeof factor.score === 'number' &&
          typeof factor.weight === 'number' &&
          factor.score >= 0 && factor.score <= 25
        );
        
        if (validFactors.length === initialFactors.length) {
          return validFactors;
        }
      }
    } catch (error) {
      console.warn('Failed to load saved assessment data:', error);
    }
    
    return [...initialFactors];
  });

  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /**
   * Calculate composite score with memoization for performance
   */
  const compositeScore = useMemo(() => {
    try {
      return AssessmentMath.calculateCompositeScore(factors);
    } catch (err) {
      setError('Error calculating composite score');
      return 0;
    }
  }, [factors]);

  /**
   * Get current maturity level
   */
  const maturityLevel = useMemo(() => {
    try {
      return AssessmentMath.getMaturityLevel(compositeScore);
    } catch (err) {
      setError('Error determining maturity level');
      return MATURITY_LEVELS[MATURITY_LEVELS.length - 1]; // Return lowest level as fallback
    }
  }, [compositeScore]);

  /**
   * Calculate progress to next level
   */
  const progressToNextLevel = useMemo(() => {
    try {
      return AssessmentMath.getProgressToNextLevel(compositeScore);
    } catch (err) {
      return 0;
    }
  }, [compositeScore]);

  /**
   * Persist factors to localStorage with error handling
   */
  const persistFactors = useCallback((newFactors: Factor[]) => {
    try {
      localStorage.setItem('polydra_factors', JSON.stringify(newFactors));
      setHasUnsavedChanges(false);
    } catch (err) {
      console.warn('Failed to save assessment data:', err);
      setError('Failed to save changes locally');
    }
  }, []);

  /**
   * Handle individual factor score changes with validation
   */
  const handleScoreChange = useCallback((index: number, value: number) => {
    // Validate input
    if (index < 0 || index >= factors.length) {
      setError('Invalid factor index');
      return;
    }

    if (!AssessmentMath.isValidScore(value)) {
      setError('Score must be between 0 and 25');
      return;
    }

    setError(null);
    const clampedValue = AssessmentMath.clampScore(value);
    
    const newFactors = [...factors];
    newFactors[index] = { ...newFactors[index], score: clampedValue };
    setFactors(newFactors);
    setHasUnsavedChanges(true);
    
    // Auto-save with debounce
    setTimeout(() => persistFactors(newFactors), 1000);

    // Announce to screen readers
    A11yUtils.announce(
      A11yUtils.generateLabel(
        'Updated {factorName} score to {score}',
        { factorName: newFactors[index].name, score: clampedValue.toString() }
      )
    );
  }, [factors, persistFactors]);

  /**
   * Handle questionnaire score updates
   */
  const handleQuestionnaireScoreUpdate = useCallback((sectionIndex: number, score: number) => {
    handleScoreChange(sectionIndex, score);
  }, [handleScoreChange]);

  /**
   * Handle factor weight changes (for advanced mode)
   */
  const handleWeightChange = useCallback((index: number, weight: number) => {
    if (index < 0 || index >= factors.length) {
      setError('Invalid factor index');
      return;
    }

    if (typeof weight !== 'number' || weight < 0) {
      setError('Weight must be a non-negative number');
      return;
    }

    setError(null);
    const newFactors = [...factors];
    newFactors[index] = { ...newFactors[index], weight };
    setFactors(newFactors);
    setHasUnsavedChanges(true);
    
    setTimeout(() => persistFactors(newFactors), 1000);
  }, [factors, persistFactors]);

  /**
   * Reset all factors to default values
   */
  const handleReset = useCallback(() => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all assessment scores to zero? This cannot be undone.'
    );
    
    if (confirmed) {
      setFactors([...initialFactors]);
      setError(null);
      setHasUnsavedChanges(true);
      persistFactors(initialFactors);
      
      A11yUtils.announce('Assessment reset to default values', 'assertive');
    }
  }, [persistFactors]);

  /**
   * Export assessment results
   */
  const handleExport = useCallback(() => {
    try {
      const results = {
        factors,
        compositeScore,
        maturityLevel,
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      };

      const dataStr = JSON.stringify(results, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `polydra-assessment-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      A11yUtils.announce('Assessment results exported successfully');
    } catch (err) {
      setError('Failed to export assessment results');
      console.error('Export error:', err);
    }
  }, [factors, compositeScore, maturityLevel]);

  return (
    <ErrorBoundary>
      <div 
        className={`${styles.calculator} ${className || ''}`}
        style={style}
        data-testid={testId}
        role="main"
        aria-label="AI Assessment Calculator"
      >
        {/* Error Display */}
        {error && (
          <div 
            className={styles.errorAlert}
            role="alert"
            aria-live="assertive"
          >
            <span className={styles.errorMessage}>{error}</span>
            <button
              className={styles.errorDismiss}
              onClick={() => setError(null)}
              aria-label="Dismiss error"
              type="button"
            >
              ×
            </button>
          </div>
        )}

        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && (
          <div className={styles.unsavedIndicator} aria-live="polite">
            <i className="pi pi-clock" aria-hidden="true" />
            <span>Saving changes...</span>
          </div>
        )}

        <div className="grid factors" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="col-9 flex flex-column text-center justify-content-center align-content-center" style={{ width: '100%' }}>
            
            {/* Composite Score Display */}
            <CompositeScoreDisplay 
              score={compositeScore} 
              onQuestionnaireScoreUpdate={handleQuestionnaireScoreUpdate}
              data-testid={`${testId}-composite-score`}
            />

            {/* Maturity Level Indicator */}
            <div 
              style={{ 
                padding: '16px 24px',
                background: `${maturityLevel.color}20`,
                border: `2px solid ${maturityLevel.color}`,
                borderRadius: '12px',
                maxWidth: '600px',
                margin: '16px auto'
              }}
              role="region"
              aria-labelledby="maturity-level-heading"
            >
              <h3 
                id="maturity-level-heading"
                style={{ margin: '0 0 8px 0', color: maturityLevel.color }}
              >
                AI Maturity Level: {maturityLevel.level}
              </h3>
              <p style={{ margin: 0, color: '#374151' }}>
                {maturityLevel.description}
              </p>
              
              {/* Progress to next level */}
              {progressToNextLevel < 100 && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                    Progress to next level: {progressToNextLevel.toFixed(1)}%
                  </div>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '8px', 
                      backgroundColor: '#e5e7eb', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                    role="progressbar"
                    aria-valuenow={progressToNextLevel}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div 
                      style={{ 
                        width: `${progressToNextLevel}%`, 
                        height: '100%', 
                        backgroundColor: maturityLevel.color,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3D Visualization */}
            <Visualization factors={factors} />
          </div>
          
          {/* Manual Controls Section */}
          <div style={{ width: '100%', maxWidth: '1200px', marginTop: '32px' }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '20px',
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Manual Score Adjustment</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                Use the Guided Assessment above for detailed evaluation, or manually adjust scores using the controls below.
              </p>
            </div>
            
            {/* Horizontal panel for sliders/inputs */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              maxWidth: 1100,
              margin: '0 auto',
            }}>
              {factors.slice(0, 6).map((factor, index) => (
                <FactorSlider
                  key={`${factor.name}-${index}`}
                  factor={factor}
                  onChange={(value) => handleScoreChange(index, value)}
                  compact
                  aria-label={A11yUtils.generateLabel(
                    A11Y_LABELS.assessment.slider,
                    { factorName: factor.name }
                  )}
                />
              ))}
            </div>

            {/* Advanced Controls */}
            {showAdvancedControls && (
              <details style={{ marginTop: '24px' }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  padding: '12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  Advanced Controls
                </summary>
                
                <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderTop: 'none' }}>
                  {/* Weight Controls */}
                  <div style={{ marginBottom: '16px' }}>
                    <h5>Factor Weights</h5>
                    {factors.map((factor, index) => (
                      <div key={`weight-${factor.name}-${index}`} style={{ marginBottom: '8px' }}>
                        <label htmlFor={`weight-${index}`} style={{ display: 'block', marginBottom: '4px' }}>
                          {factor.name}: {factor.weight}
                        </label>
                        <input
                          id={`weight-${index}`}
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={factor.weight}
                          onChange={(e) => handleWeightChange(index, parseFloat(e.target.value))}
                          style={{ width: '200px' }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                      onClick={handleReset}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      type="button"
                    >
                      Reset Assessment
                    </button>
                    
                    <button
                      onClick={handleExport}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      type="button"
                    >
                      Export Results
                    </button>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>

        {/* Screen Reader Summary */}
        <div 
          style={{ 
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          Current assessment: {factors.length} factors evaluated. 
          Composite score: {compositeScore.toFixed(2)}. 
          Maturity level: {maturityLevel.level}.
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Calculator;