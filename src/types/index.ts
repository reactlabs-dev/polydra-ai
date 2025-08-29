/**
 * @fileoverview Core type definitions for the Polydra AI Assessment Platform
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

/**
 * Represents a single assessment factor in the AI governance evaluation
 */
export interface Factor {
  /** Human-readable name of the assessment factor */
  name: string;
  /** Current score value (0-25 scale) */
  score: number;
  /** Weighting multiplier for composite score calculation (typically 0-1) */
  weight: number;
  /** Optional detailed description of the factor */
  description?: string;
  /** Unique identifier for the factor */
  id?: string;
  /** Category classification for organizational purposes */
  category?: FactorCategory;
}

/**
 * Categories for organizing assessment factors
 */
export enum FactorCategory {
  GOVERNANCE = 'governance',
  ETHICS = 'ethics',
  DATA = 'data',
  MODEL = 'model',
  OPERATIONS = 'operations',
  STAKEHOLDER = 'stakeholder'
}

/**
 * AI maturity levels based on composite assessment scores
 */
export interface MaturityLevel {
  /** Maturity level designation */
  level: 'Developing' | 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  /** Associated color code for UI display */
  color: string;
  /** Descriptive text explaining the maturity level */
  description: string;
  /** Minimum score threshold for this level */
  threshold: number;
}

/**
 * Questionnaire system types
 */
export interface Question {
  /** Unique identifier for the question */
  id: string;
  /** Question text presented to the user */
  text: string;
  /** Complexity/difficulty category */
  category: QuestionCategory;
  /** Maximum points awarded for this question */
  points: number;
  /** Available answer options */
  options: QuestionOption[];
  /** Optional explanation or context */
  explanation?: string;
  /** References to relevant standards or frameworks */
  references?: string[];
}

/**
 * Question complexity categories
 */
export type QuestionCategory = 'basic' | 'intermediate' | 'advanced' | 'expert';

/**
 * Individual answer option for questions
 */
export interface QuestionOption {
  /** Display text for the option */
  text: string;
  /** Points awarded when this option is selected */
  score: number;
  /** Optional explanation of why this option has this score */
  rationale?: string;
}

/**
 * User's responses to questionnaire
 */
export interface AssessmentResponse {
  /** Question ID to answer score mapping */
  [questionId: string]: number;
}

/**
 * Complete assessment results
 */
export interface AssessmentResults {
  /** Individual factor scores */
  factorScores: Factor[];
  /** Overall composite score */
  compositeScore: number;
  /** Determined maturity level */
  maturityLevel: MaturityLevel;
  /** Timestamp of assessment completion */
  completedAt: Date;
  /** Assessment methodology version */
  version: string;
  /** Optional user-provided metadata */
  metadata?: {
    organizationName?: string;
    assessorName?: string;
    notes?: string;
  };
}

/**
 * Assessment section definitions
 */
export interface AssessmentSection {
  /** Section identifier */
  id: string;
  /** Human-readable section name */
  name: string;
  /** Questions in this section */
  questions: Question[];
  /** Section description */
  description: string;
  /** Maximum possible points in this section */
  maxPoints: number;
}

/**
 * Component prop interfaces
 */
export interface BaseComponentProps {
  /** CSS class name override */
  className?: string;
  /** Inline style override */
  style?: React.CSSProperties;
  /** Test identifier for automated testing */
  'data-testid'?: string;
}

/**
 * Error handling types
 */
export interface AppError {
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Optional error details for debugging */
  details?: unknown;
  /** Timestamp when error occurred */
  timestamp: Date;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  /** Response data payload */
  data?: T;
  /** Error information if request failed */
  error?: AppError;
  /** Request success status */
  success: boolean;
  /** Response metadata */
  metadata?: {
    requestId?: string;
    version?: string;
    timestamp?: Date;
  };
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /** Primary brand colors */
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  /** Typography settings */
  typography: {
    fontFamily: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
  };
  /** Spacing scale */
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/**
 * Application configuration
 */
export interface AppConfig {
  /** Application metadata */
  app: {
    name: string;
    version: string;
    description: string;
    author: string;
  };
  /** API configuration */
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  /** Feature flags */
  features: {
    enableAnalytics: boolean;
    enableErrorTracking: boolean;
    enableA11y: boolean;
  };
  /** Theme configuration */
  theme: ThemeConfig;
}

/**
 * Utility types for enhanced type safety
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Common component base properties for consistent interface
 */
export interface BaseComponentProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Test identifier for automated testing */
  'data-testid'?: string;
}