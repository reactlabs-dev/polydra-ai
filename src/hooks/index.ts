/**
 * @fileoverview Custom React hooks for the Polydra AI Assessment Platform
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Factor, AssessmentResults, MaturityLevel, AppError } from '../types';
import { DEFAULT_FACTORS, STORAGE_KEYS } from '../constants';
import { AssessmentMath, StorageUtils, ErrorUtils } from '../utils';

/**
 * Hook for managing assessment state with persistence and validation
 * @param initialFactors - Initial factor values (optional)
 * @returns Assessment state and control functions
 */
export function useAssessment(initialFactors?: Factor[]) {
  const [factors, setFactors] = useState<Factor[]>(() => {
    // Try to load from localStorage first, fallback to initial or default factors
    const savedFactors = StorageUtils.getItem<Factor[] | null>(STORAGE_KEYS.assessmentResults, null);
    return savedFactors || initialFactors || [...DEFAULT_FACTORS];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Debounced save to localStorage
  const saveTimeoutRef = useRef<number>();

  const debouncedSave = useCallback((factorsToSave: Factor[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = window.setTimeout(() => {
      const success = StorageUtils.setItem(STORAGE_KEYS.assessmentResults, factorsToSave);
      if (success) {
        setHasUnsavedChanges(false);
      } else {
        setError(ErrorUtils.createError('STORAGE_ERROR', 'Failed to save assessment data'));
      }
    }, 1000);
  }, []);

  // Calculate composite score with memoization
  const compositeScore = useMemo(() => {
    return AssessmentMath.calculateCompositeScore(factors);
  }, [factors]);

  // Get maturity level with memoization
  const maturityLevel = useMemo(() => {
    return AssessmentMath.getMaturityLevel(compositeScore);
  }, [compositeScore]);

  // Progress to next maturity level
  const progressToNextLevel = useMemo(() => {
    return AssessmentMath.getProgressToNextLevel(compositeScore);
  }, [compositeScore]);

  /**
   * Updates a single factor's score with validation
   */
  const updateFactorScore = useCallback((index: number, newScore: number) => {
    if (index < 0 || index >= factors.length) {
      setError(ErrorUtils.createError('INVALID_INDEX', 'Invalid factor index'));
      return;
    }

    if (!AssessmentMath.isValidScore(newScore)) {
      setError(ErrorUtils.createError('INVALID_SCORE', 'Score must be between 0 and 25'));
      return;
    }

    setError(null);
    const clampedScore = AssessmentMath.clampScore(newScore);
    
    setFactors(prevFactors => {
      const newFactors = [...prevFactors];
      newFactors[index] = { ...newFactors[index], score: clampedScore };
      return newFactors;
    });
    
    setHasUnsavedChanges(true);
  }, [factors.length]);

  /**
   * Updates a factor's weight with validation
   */
  const updateFactorWeight = useCallback((index: number, newWeight: number) => {
    if (index < 0 || index >= factors.length) {
      setError(ErrorUtils.createError('INVALID_INDEX', 'Invalid factor index'));
      return;
    }

    if (typeof newWeight !== 'number' || newWeight < 0) {
      setError(ErrorUtils.createError('INVALID_WEIGHT', 'Weight must be a non-negative number'));
      return;
    }

    setError(null);
    setFactors(prevFactors => {
      const newFactors = [...prevFactors];
      newFactors[index] = { ...newFactors[index], weight: newWeight };
      return newFactors;
    });
    
    setHasUnsavedChanges(true);
  }, [factors.length]);

  /**
   * Resets all factors to default state
   */
  const resetAssessment = useCallback(() => {
    setFactors([...DEFAULT_FACTORS]);
    setError(null);
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Generates complete assessment results
   */
  const generateResults = useCallback((): AssessmentResults => {
    return {
      factorScores: [...factors],
      compositeScore,
      maturityLevel,
      completedAt: new Date(),
      version: '1.0.0',
    };
  }, [factors, compositeScore, maturityLevel]);

  /**
   * Exports assessment data as JSON
   */
  const exportAssessment = useCallback(() => {
    const results = generateResults();
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
  }, [generateResults]);

  /**
   * Imports assessment data from file
   */
  const importAssessment = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text) as AssessmentResults;
      
      if (!data.factorScores || !Array.isArray(data.factorScores)) {
        throw new Error('Invalid assessment data format');
      }

      setFactors(data.factorScores);
      setHasUnsavedChanges(true);
    } catch (err) {
      setError(ErrorUtils.normalizeError(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-save when factors change
  useEffect(() => {
    if (hasUnsavedChanges) {
      debouncedSave(factors);
    }
  }, [factors, hasUnsavedChanges, debouncedSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    factors,
    compositeScore,
    maturityLevel,
    progressToNextLevel,
    isLoading,
    error,
    hasUnsavedChanges,
    
    // Actions
    updateFactorScore,
    updateFactorWeight,
    resetAssessment,
    generateResults,
    exportAssessment,
    importAssessment,
    
    // Utilities
    clearError: () => setError(null),
  };
}

/**
 * Hook for managing questionnaire state
 */
export function useQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sectionScores, setSectionScores] = useState<number[]>(Array(6).fill(0));

  const updateAnswer = useCallback((questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  }, []);

  const updateSectionScore = useCallback((sectionIndex: number, score: number) => {
    setSectionScores(prev => {
      const newScores = [...prev];
      newScores[sectionIndex] = score;
      return newScores;
    });
  }, []);

  const navigateToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < 6) {
      setCurrentSection(sectionIndex);
    }
  }, []);

  const nextSection = useCallback(() => {
    navigateToSection(currentSection + 1);
  }, [currentSection, navigateToSection]);

  const previousSection = useCallback(() => {
    navigateToSection(currentSection - 1);
  }, [currentSection, navigateToSection]);

  const resetQuestionnaire = useCallback(() => {
    setCurrentSection(0);
    setAnswers({});
    setSectionScores(Array(6).fill(0));
  }, []);

  const isComplete = useMemo(() => {
    return sectionScores.every(score => score > 0);
  }, [sectionScores]);

  return {
    currentSection,
    answers,
    sectionScores,
    isComplete,
    updateAnswer,
    updateSectionScore,
    navigateToSection,
    nextSection,
    previousSection,
    resetQuestionnaire,
  };
}

/**
 * Hook for managing dark mode and theme preferences
 */
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = StorageUtils.getItem<boolean | null>('theme_dark_mode', null);
    if (saved !== null) return saved;
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      StorageUtils.setItem('theme_dark_mode', newValue);
      return newValue;
    });
  }, []);

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggleDarkMode,
  };
}

/**
 * Hook for managing keyboard shortcuts
 */
export function useKeyboardShortcuts() {
  const [shortcuts] = useState(() => new Map<string, () => void>());

  const addShortcut = useCallback((key: string, handler: () => void) => {
    shortcuts.set(key.toLowerCase(), handler);
  }, [shortcuts]);

  const removeShortcut = useCallback((key: string) => {
    shortcuts.delete(key.toLowerCase());
  }, [shortcuts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = `${event.ctrlKey ? 'ctrl+' : ''}${event.altKey ? 'alt+' : ''}${event.shiftKey ? 'shift+' : ''}${event.key.toLowerCase()}`;
      const handler = shortcuts.get(key);
      
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return {
    addShortcut,
    removeShortcut,
  };
}

/**
 * Hook for managing async operations with loading states
 */
export function useAsyncOperation<T = unknown, P extends unknown[] = []>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (asyncFn: (...args: P) => Promise<T>, ...args: P) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFn(...args);
      setData(result);
      return result;
    } catch (err) {
      const appError = ErrorUtils.normalizeError(err);
      setError(appError);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    execute,
    reset,
  };
}

/**
 * Hook for managing component visibility with animation support
 */
export function useVisibility(initialVisible: boolean = false) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
    setIsAnimating(true);
  }, []);

  const hide = useCallback(() => {
    setIsAnimating(true);
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  // Reset animation state after a delay
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  return {
    isVisible,
    isAnimating,
    show,
    hide,
    toggle,
  };
}