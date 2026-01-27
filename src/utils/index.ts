/**
 * @fileoverview Utility functions for the Polydra AI Assessment Platform
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import { Factor, MaturityLevel, AppError } from '../types';
import { MATURITY_LEVELS, SCORING } from '../constants';

/**
 * Mathematical utilities for assessment calculations
 */
export class AssessmentMath {
  /**
   * Calculates the weighted composite score from factors
   * @param factors - Array of assessment factors
   * @returns Calculated composite score (0-150 typical range)
   */
  static calculateCompositeScore(factors: Factor[]): number {
    if (!factors || factors.length === 0) return 0;
    
    return factors.reduce((total, factor) => {
      const score = Math.max(0, Math.min(SCORING.MAX_SCORE, factor.score || 0));
      const weight = Math.max(0, factor.weight || 1);
      return total + (score * weight);
    }, 0);
  }

  /**
   * Determines maturity level based on composite score
   * @param compositeScore - The calculated composite score
   * @returns MaturityLevel object with level details
   */
  static getMaturityLevel(compositeScore: number): MaturityLevel {
    const normalizedScore = Math.max(0, compositeScore);
    
    // Find the highest threshold that the score meets or exceeds
    for (let i = 0; i < MATURITY_LEVELS.length; i++) {
      if (normalizedScore >= MATURITY_LEVELS[i].threshold) {
        return { ...MATURITY_LEVELS[i] };
      }
    }
    
    // Fallback to the lowest level
    return { ...MATURITY_LEVELS[MATURITY_LEVELS.length - 1] };
  }

  /**
   * Calculates percentage progress toward next maturity level
   * @param compositeScore - Current composite score
   * @returns Percentage (0-100) toward next level
   */
  static getProgressToNextLevel(compositeScore: number): number {
    const currentLevel = this.getMaturityLevel(compositeScore);
    const currentIndex = MATURITY_LEVELS.findIndex(level => level.level === currentLevel.level);
    
    if (currentIndex <= 0) return 100; // Already at highest level
    
    const nextLevel = MATURITY_LEVELS[currentIndex - 1];
    const currentThreshold = currentLevel.threshold;
    const nextThreshold = nextLevel.threshold;
    const progress = ((compositeScore - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    return Math.max(0, Math.min(100, progress));
  }

  /**
   * Validates that a score is within acceptable bounds
   * @param score - Score to validate
   * @returns True if score is valid
   */
  static isValidScore(score: number): boolean {
    return typeof score === 'number' && 
           !isNaN(score) && 
           isFinite(score) && 
           score >= SCORING.MIN_SCORE && 
           score <= SCORING.MAX_SCORE;
  }

  /**
   * Clamps a score to valid bounds
   * @param score - Score to clamp
   * @returns Score within valid bounds
   */
  static clampScore(score: number): number {
    if (!this.isValidScore(score)) return SCORING.MIN_SCORE;
    return Math.max(SCORING.MIN_SCORE, Math.min(SCORING.MAX_SCORE, score));
  }
}

/**
 * Data validation utilities
 */
export class ValidationUtils {
  /**
   * Validates a Factor object structure
   * @param factor - Factor to validate
   * @returns Validation result with error details
   */
  static validateFactor(factor: unknown): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!factor || typeof factor !== 'object') {
      errors.push('Factor must be an object');
      return { isValid: false, errors };
    }
    
    const f = factor as Record<string, unknown>;
    
    if (!f.name || typeof f.name !== 'string' || f.name.trim().length === 0) {
      errors.push('Factor name must be a non-empty string');
    }
    
    if (f.score !== undefined && !AssessmentMath.isValidScore(f.score as number)) {
      errors.push(`Factor score must be between ${SCORING.MIN_SCORE} and ${SCORING.MAX_SCORE}`);
    }
    
    if (f.weight !== undefined && (typeof f.weight !== 'number' || f.weight < 0)) {
      errors.push('Factor weight must be a non-negative number');
    }
    
    return { isValid: errors.length === 0, errors };
  }

  /**
   * Validates an array of factors
   * @param factors - Array of factors to validate
   * @returns Validation result
   */
  static validateFactors(factors: unknown): { isValid: boolean; errors: string[] } {
    if (!Array.isArray(factors)) {
      return { isValid: false, errors: ['Factors must be an array'] };
    }
    
    const allErrors: string[] = [];
    
    factors.forEach((factor, index) => {
      const { isValid, errors } = this.validateFactor(factor);
      if (!isValid) {
        allErrors.push(`Factor ${index}: ${errors.join(', ')}`);
      }
    });
    
    return { isValid: allErrors.length === 0, errors: allErrors };
  }

  /**
   * Sanitizes user input to prevent XSS
   * @param input - Input string to sanitize
   * @returns Sanitized string
   */
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
      .slice(0, 1000); // Limit length
  }

  /**
   * Validates email address format
   * @param email - Email to validate
   * @returns True if email is valid format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

/**
 * Error handling utilities
 */
export class ErrorUtils {
  /**
   * Creates a standardized AppError
   * @param code - Error code
   * @param message - Error message
   * @param details - Optional error details
   * @returns Standardized AppError object
   */
  static createError(code: string, message: string, details?: unknown): AppError {
    return {
      code,
      message,
      details,
      timestamp: new Date(),
    };
  }

  /**
   * Logs error to console with structured format
   * @param error - Error to log
   * @param context - Optional context information
   */
  static logError(error: AppError | Error, context?: Record<string, unknown>): void {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
      context,
    };
    
    console.error('[Polydra Error]', JSON.stringify(errorInfo, null, 2));
  }

  /**
   * Converts unknown error to AppError
   * @param error - Error to convert
   * @returns Standardized AppError
   */
  static normalizeError(error: unknown): AppError {
    if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
      return error as AppError;
    }
    
    if (error instanceof Error) {
      return this.createError('UNKNOWN_ERROR', error.message, { stack: error.stack });
    }
    
    return this.createError('GENERIC_ERROR', 'An unexpected error occurred', error);
  }
}

/**
 * Local storage utilities with error handling
 */
export class StorageUtils {
  /**
   * Safely stores data in localStorage
   * @param key - Storage key
   * @param data - Data to store
   * @returns Success status
   */
  static setItem<T>(key: string, data: T): boolean {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      ErrorUtils.logError(ErrorUtils.normalizeError(error), { key, operation: 'setItem' });
      return false;
    }
  }

  /**
   * Safely retrieves data from localStorage
   * @param key - Storage key
   * @param defaultValue - Default value if key not found
   * @returns Retrieved data or default value
   */
  static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      ErrorUtils.logError(ErrorUtils.normalizeError(error), { key, operation: 'getItem' });
      return defaultValue;
    }
  }

  /**
   * Safely removes item from localStorage
   * @param key - Storage key to remove
   * @returns Success status
   */
  static removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      ErrorUtils.logError(ErrorUtils.normalizeError(error), { key, operation: 'removeItem' });
      return false;
    }
  }

  /**
   * Clears all localStorage data for the app
   * @param keyPrefix - Prefix to filter keys (optional)
   * @returns Success status
   */
  static clear(keyPrefix?: string): boolean {
    try {
      if (keyPrefix) {
        // Clear only keys with the specified prefix
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(keyPrefix)) {
            localStorage.removeItem(key);
          }
        });
      } else {
        localStorage.clear();
      }
      return true;
    } catch (error) {
      ErrorUtils.logError(ErrorUtils.normalizeError(error), { operation: 'clear', keyPrefix });
      return false;
    }
  }
}

/**
 * Formatting and display utilities
 */
export class FormatUtils {
  /**
   * Formats a number with specified decimal places
   * @param value - Number to format
   * @param decimals - Number of decimal places (default: 2)
   * @returns Formatted number string
   */
  static formatNumber(value: number, decimals: number = 2): string {
    if (typeof value !== 'number' || isNaN(value)) return '0.00';
    return value.toFixed(decimals);
  }

  /**
   * Formats a percentage value
   * @param value - Percentage value (0-100)
   * @param decimals - Number of decimal places (default: 1)
   * @returns Formatted percentage string
   */
  static formatPercentage(value: number, decimals: number = 1): string {
    return `${this.formatNumber(value, decimals)}%`;
  }

  /**
   * Formats a date for display
   * @param date - Date to format
   * @param options - Intl.DateTimeFormatOptions
   * @returns Formatted date string
   */
  static formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
  }

  /**
   * Truncates text to specified length with ellipsis
   * @param text - Text to truncate
   * @param maxLength - Maximum length
   * @returns Truncated text
   */
  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 3)}...`;
  }

  /**
   * Capitalizes first letter of each word
   * @param text - Text to capitalize
   * @returns Capitalized text
   */
  static capitalize(text: string): string {
    return text.replace(/\b\w/g, char => char.toUpperCase());
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceUtils {
  private static timers: Map<string, number> = new Map();

  /**
   * Starts a performance timer
   * @param label - Timer label
   */
  static startTimer(label: string): void {
    this.timers.set(label, performance.now());
  }

  /**
   * Ends a performance timer and logs the result
   * @param label - Timer label
   * @returns Elapsed time in milliseconds
   */
  static endTimer(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      console.warn(`Timer '${label}' was not started`);
      return 0;
    }
    
    const elapsed = performance.now() - startTime;
    this.timers.delete(label);
    console.log(`⏱️ [${label}]: ${elapsed.toFixed(2)}ms`);
    return elapsed;
  }

  /**
   * Measures the execution time of a function
   * @param fn - Function to measure
   * @param label - Label for measurement
   * @returns Function result and execution time
   */
  static async measure<T>(fn: () => Promise<T>, label: string): Promise<{ result: T; time: number }> {
    this.startTimer(label);
    const result = await fn();
    const time = this.endTimer(label);
    return { result, time };
  }
}

/**
 * Accessibility utilities
 */
export class A11yUtils {
  /**
   * Generates accessible label with dynamic values
   * @param template - Label template with placeholders
   * @param values - Values to substitute
   * @returns Generated accessible label
   */
  static generateLabel(template: string, values: Record<string, string>): string {
    return Object.entries(values).reduce(
      (label: string, [key, value]: [string, string]) => label.replace(`{${key}}`, value),
      template
    );
  }

  /**
   * Announces text to screen readers
   * @param message - Message to announce
   * @param priority - Announcement priority (polite/assertive)
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    
    document.body.appendChild(announcer);
    announcer.textContent = message;
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * Checks if user prefers reduced motion
   * @returns True if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}