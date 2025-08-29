/**
 * @fileoverview Main Calculator component for AI Assessment Platform
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 * 
 * This component serves as the central hub for the AI assessment experience,
 * combining interactive factor scoring, composite score calculation, 
 * maturity level determination, and visual feedback.
 */

import React, { memo } from 'react';
import { useAssessment } from '@/hooks';
import { A11Y_LABELS } from '@/constants';
import { A11yUtils } from '@/utils';
import { AssessmentResults, BaseComponentProps } from '@/types';
import CompositeScoreDisplay from '../compositeScoreDisplay/CompositeScoreDisplay';
import Visualization from '../visualization/Visualization';
import FactorSlider from '../factorSlider/FactorSlider';
import ErrorBoundary from '../common/ErrorBoundary';
import LoadingSpinner from '../common/LoadingSpinner';
import styles from './Calculator.module.scss';

/**
 * Props interface for the Calculator component
 */
export interface CalculatorProps extends BaseComponentProps {
  /** Optional initial factors to populate the calculator */
  initialFactors?: never; // Removed to use hook's internal state management
  /** Callback fired when assessment is completed */
  onAssessmentComplete?: (results: AssessmentResults) => void;
  /** Whether to show advanced controls */
  showAdvancedControls?: boolean;
  /** Whether to enable auto-save functionality */
  enableAutoSave?: boolean;
}

/**
 * Main Calculator Component
 * 
 * Provides a comprehensive interface for AI assessment including:
 * - Interactive factor scoring via sliders and questionnaire
 * - Real-time composite score calculation
 * - Maturity level visualization
 * - 3D cube visualization of assessment dimensions
 * - Accessibility features and keyboard navigation
 * 
 * @component
 * @example
 * ```tsx
 * <Calculator 
 *   showAdvancedControls={true}
 *   onAssessmentComplete={(results) => console.log(results)}
 * />
 * ```
 */
export const Calculator: React.FC<CalculatorProps> = memo(({
  className,
  style,
  'data-testid': testId,
  onAssessmentComplete,
  showAdvancedControls = false,
  enableAutoSave = true,
}) => {
  // Use the custom assessment hook for state management
  const {
    factors,
    compositeScore,
    maturityLevel,
    progressToNextLevel,
    isLoading,
    error,
    hasUnsavedChanges,
    updateFactorScore,
    updateFactorWeight,
    resetAssessment,
    generateResults,
    exportAssessment,
    clearError,
  } = useAssessment();

  /**
   * Handles score updates from questionnaire
   */
  const handleQuestionnaireScoreUpdate = React.useCallback((sectionIndex: number, score: number) => {
    updateFactorScore(sectionIndex, score);
    
    // Announce score update to screen readers
    const factorName = factors[sectionIndex]?.name;
    if (factorName) {
      A11yUtils.announce(
        A11yUtils.generateLabel(
          'Updated {factorName} score to {score}',
          { factorName, score: score.toFixed(1) }
        )
      );
    }
  }, [updateFactorScore, factors]);

  /**
   * Handles individual factor score changes
   */
  const handleFactorScoreChange = React.useCallback((index: number, value: number) => {
    updateFactorScore(index, value);
  }, [updateFactorScore]);

  /**
   * Handles assessment completion
   */
  const handleAssessmentComplete = React.useCallback(() => {
    const results = generateResults();
    onAssessmentComplete?.(results);
    
    A11yUtils.announce(
      `Assessment completed. Overall maturity level: ${maturityLevel.level}`,
      'assertive'
    );
  }, [generateResults, onAssessmentComplete, maturityLevel.level]);

  // Show loading spinner while assessment is processing
  if (isLoading) {
    return (
      <div className={styles.loadingContainer} data-testid={`${testId}-loading`}>
        <LoadingSpinner size="large" message="Processing assessment..." />
      </div>
    );
  }

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
            <span className={styles.errorMessage}>{error.message}</span>
            <button
              className={styles.errorDismiss}
              onClick={clearError}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && enableAutoSave && (
          <div className={styles.unsavedIndicator} aria-live="polite">
            <i className="pi pi-clock" />
            <span>Saving changes...</span>
          </div>
        )}

        {/* Main Assessment Content */}
        <div className={styles.assessmentGrid}>
          
          {/* Primary Assessment Section */}
          <section 
            className={styles.primarySection}
            aria-labelledby="composite-score-heading"
          >
            <CompositeScoreDisplay 
              score={compositeScore}
              onQuestionnaireScoreUpdate={handleQuestionnaireScoreUpdate}
              data-testid={`${testId}-composite-score`}
            />

            {/* Maturity Level Indicator */}
            <div 
              className={styles.maturityIndicator}
              style={{ 
                backgroundColor: `${maturityLevel.color}20`,
                border: `2px solid ${maturityLevel.color}`,
              }}
              role="region"
              aria-labelledby="maturity-level-heading"
            >
              <h3 
                id="maturity-level-heading"
                className={styles.maturityLevel}
                style={{ color: maturityLevel.color }}
              >
                AI Maturity Level: {maturityLevel.level}
              </h3>
              <p className={styles.maturityDescription}>
                {maturityLevel.description}
              </p>
              
              {/* Progress to next level */}
              {progressToNextLevel < 100 && (
                <div className={styles.progressContainer}>
                  <span className={styles.progressLabel}>
                    Progress to next level: {progressToNextLevel.toFixed(1)}%
                  </span>
                  <div 
                    className={styles.progressBar}
                    role="progressbar"
                    aria-valuenow={progressToNextLevel}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${progressToNextLevel}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3D Visualization */}
            <Visualization 
              factors={factors} 
              data-testid={`${testId}-visualization`}
            />
          </section>

          {/* Manual Controls Section */}
          <section 
            className={styles.controlsSection}
            aria-labelledby="manual-controls-heading"
          >
            <div className={styles.controlsHeader}>
              <h4 id="manual-controls-heading" className={styles.controlsTitle}>
                Manual Score Adjustment
              </h4>
              <p className={styles.controlsDescription}>
                Use the Guided Assessment above for detailed evaluation, or manually 
                adjust scores using the controls below.
              </p>
            </div>
            
            {/* Factor Sliders Grid */}
            <div 
              className={styles.slidersGrid}
              role="group"
              aria-label="Assessment factor controls"
            >
              {factors.map((factor, index) => (
                <FactorSlider
                  key={factor.id || `factor-${index}`}
                  factor={factor}
                  onChange={(value) => handleFactorScoreChange(index, value)}
                  compact
                  data-testid={`${testId}-factor-${index}`}
                  aria-label={A11yUtils.generateLabel(
                    A11Y_LABELS.assessment.slider,
                    { factorName: factor.name }
                  )}
                />
              ))}
            </div>

            {/* Advanced Controls */}
            {showAdvancedControls && (
              <div className={styles.advancedControls}>
                <details className={styles.advancedDetails}>
                  <summary className={styles.advancedSummary}>
                    Advanced Options
                  </summary>
                  
                  <div className={styles.advancedContent}>
                    {/* Weight Controls */}
                    <div className={styles.weightControls}>
                      <h5>Factor Weights</h5>
                      {factors.map((factor, index) => (
                        <div key={factor.id || `weight-${index}`} className={styles.weightControl}>
                          <label htmlFor={`weight-${index}`}>
                            {factor.name}
                          </label>
                          <input
                            id={`weight-${index}`}
                            type="number"
                            min="0"
                            max="2"
                            step="0.1"
                            value={factor.weight}
                            onChange={(e) => updateFactorWeight(index, parseFloat(e.target.value) || 0)}
                            className={styles.weightInput}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.resetButton}
                        onClick={resetAssessment}
                        aria-describedby="reset-help"
                      >
                        Reset Assessment
                      </button>
                      <div id="reset-help" className={styles.helpText}>
                        This will reset all scores to zero
                      </div>
                      
                      <button
                        className={styles.exportButton}
                        onClick={exportAssessment}
                        aria-describedby="export-help"
                      >
                        Export Results
                      </button>
                      <div id="export-help" className={styles.helpText}>
                        Download assessment results as JSON
                      </div>

                      <button
                        className={styles.completeButton}
                        onClick={handleAssessmentComplete}
                      >
                        Complete Assessment
                      </button>
                    </div>
                  </div>
                </details>
              </div>
            )}
          </section>
        </div>

        {/* Assessment Summary for Screen Readers */}
        <div 
          className={styles.srOnly}
          aria-live="polite"
          aria-atomic="true"
        >
          Current composite score: {compositeScore.toFixed(2)}. 
          Maturity level: {maturityLevel.level}. 
          {factors.length} factors assessed.
        </div>
      </div>
    </ErrorBoundary>
  );
});

// Set display name for debugging
Calculator.displayName = 'Calculator';

export default Calculator;