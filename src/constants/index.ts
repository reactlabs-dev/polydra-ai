/**
 * @fileoverview Application constants and configuration values
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import { Factor, MaturityLevel, FactorCategory } from '../types';

/**
 * Application metadata and branding
 */
export const APP_CONFIG = {
  name: 'Polydra AI Assessment Platform',
  version: '1.0.0',
  description: 'AIDAQInsights™ Assessment Platform - Multidimensional AI assessment and visualization',
  author: 'Matt Vegas',
  company: 'Inference Stack',
  website: 'https://www.inference-stack.com',
  repository: 'https://github.com/reactlabs-dev/polydraiq',
  license: 'AGPL-3.0',
  trademark: 'AIDAQInsights™',
} as const;

/**
 * Assessment scoring configuration
 */
export const SCORING = {
  /** Minimum possible score for any factor */
  MIN_SCORE: 0,
  /** Maximum possible score for any factor */
  MAX_SCORE: 25,
  /** Default weight for all factors */
  DEFAULT_WEIGHT: 1,
  /** Score increment step */
  SCORE_STEP: 1,
  /** Number of assessment factors */
  FACTOR_COUNT: 6,
} as const;

/**
 * AI Maturity Level definitions with thresholds and styling
 */
export const MATURITY_LEVELS: readonly MaturityLevel[] = [
  {
    level: 'Expert',
    color: '#ef4444',
    description: 'World-class AI governance and implementation',
    threshold: 100,
  },
  {
    level: 'Advanced',
    color: '#f97316',
    description: 'Sophisticated AI practices with comprehensive controls',
    threshold: 75,
  },
  {
    level: 'Intermediate',
    color: '#eab308',
    description: 'Solid AI foundation with room for enhancement',
    threshold: 50,
  },
  {
    level: 'Basic',
    color: '#22c55e',
    description: 'Initial AI practices in place',
    threshold: 25,
  },
  {
    level: 'Developing',
    color: '#6b7280',
    description: 'AI governance and practices are in early stages',
    threshold: 0,
  },
] as const;

/**
 * Default assessment factors with comprehensive descriptions
 */
export const DEFAULT_FACTORS: readonly Factor[] = [
  {
    name: 'Governance & Accountability',
    score: 0,
    weight: 1,
    id: 'governance',
    category: FactorCategory.GOVERNANCE,
    description: 'Organizational structures, policies, and processes that direct and oversee AI initiatives, ensuring alignment with business objectives and regulatory requirements.',
  },
  {
    name: 'Ethics & Responsible AI',
    score: 0,
    weight: 1,
    id: 'ethics',
    category: FactorCategory.ETHICS,
    description: 'Principles, practices, and safeguards that ensure AI systems are developed and deployed in ways that respect human rights, promote fairness, and minimize harm.',
  },
  {
    name: 'Data Integrity & Security',
    score: 0,
    weight: 1,
    id: 'data',
    category: FactorCategory.DATA,
    description: 'Comprehensive data management practices including quality assurance, privacy protection, security measures, and compliance with data protection regulations.',
  },
  {
    name: 'Model Quality & Technical Rigor',
    score: 0,
    weight: 1,
    id: 'model',
    category: FactorCategory.MODEL,
    description: 'Technical excellence in AI model development, validation, testing, documentation, and continuous improvement throughout the model lifecycle.',
  },
  {
    name: 'Operationalization & Lifecycle Management',
    score: 0,
    weight: 1,
    id: 'operations',
    category: FactorCategory.OPERATIONS,
    description: 'Processes and infrastructure for deploying, monitoring, maintaining, and evolving AI systems in production environments.',
  },
  {
    name: 'Stakeholder & Societal Impact',
    score: 0,
    weight: 1,
    id: 'stakeholder',
    category: FactorCategory.STAKEHOLDER,
    description: 'Consideration of broader impacts on users, communities, and society, including accessibility, transparency, and positive value creation.',
  },
] as const;

/**
 * Assessment section identifiers
 */
export const ASSESSMENT_SECTIONS = [
  'Governance & Accountability',
  'Ethics & Responsible AI',
  'Data Integrity & Security',
  'Model Quality & Technical Rigor',
  'Operationalization & Lifecycle Management',
  'Stakeholder & Societal Impact',
] as const;

/**
 * Question category styling and metadata
 */
export const QUESTION_CATEGORIES = {
  basic: {
    label: 'Basic',
    icon: '🟢',
    color: '#22c55e',
    description: 'Foundational practices and requirements',
  },
  intermediate: {
    label: 'Intermediate',
    icon: '🟡',
    color: '#eab308',
    description: 'Established practices with structured processes',
  },
  advanced: {
    label: 'Advanced',
    icon: '🟠',
    color: '#f97316',
    description: 'Sophisticated practices with comprehensive controls',
  },
  expert: {
    label: 'Expert',
    icon: '🔴',
    color: '#ef4444',
    description: 'Leading-edge practices with automated governance',
  },
} as const;

/**
 * Color palette for data visualization
 */
export const VISUALIZATION_COLORS = {
  primary: '#4C628D',
  secondary: '#6EA8D9',
  accent: '#34B3A0',
  neutral: '#F2F5FA',
  highlight: '#E6B646',
  muted: '#9AB8C8',
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    light: '#9ca3af',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    accent: '#f0f9ff',
  },
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
} as const;

/**
 * Face colors for 3D cube visualization
 */
export const CUBE_FACE_COLORS = [
  '#4C628D', // Governance - Muted blue
  '#6EA8D9', // Ethics - Lighter blue
  '#34B3A0', // Data - Teal/aqua
  '#F2F5FA', // Model - Light gray
  '#E6B646', // Operations - Gold accent
  '#9AB8C8', // Stakeholder - Light slate blue
] as const;

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  widescreen: '1200px',
} as const;

/**
 * Animation and transition durations
 */
export const ANIMATIONS = {
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  verySlow: '600ms',
} as const;

/**
 * Z-index layering system
 */
export const Z_INDEX = {
  dropdown: 1000,
  modal: 1050,
  popover: 1100,
  tooltip: 1200,
  toast: 1300,
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  assessmentResults: 'polydra_assessment_results',
  userPreferences: 'polydra_user_preferences',
  appSettings: 'polydra_app_settings',
} as const;

/**
 * Error messages and codes
 */
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection and try again.',
  VALIDATION: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER: 'Server error. Please try again later.',
} as const;

/**
 * Accessibility labels and descriptions
 */
export const A11Y_LABELS = {
  assessment: {
    slider: 'Adjust score for {factorName}',
    composite: 'Overall composite AI maturity score',
    maturity: 'Current AI maturity level: {level}',
    questionnaire: 'Open guided assessment questionnaire',
  },
  navigation: {
    next: 'Navigate to next section',
    previous: 'Navigate to previous section',
    close: 'Close dialog',
    menu: 'Open main menu',
  },
  visualization: {
    cube: '3D visualization of AI assessment factors',
    chart: 'Assessment results visualization',
  },
} as const;

/**
 * Legal and compliance information
 */
export const LEGAL = {
  copyright: `Copyright © ${new Date().getFullYear()}, AIDAQInsights™. All rights reserved.`,
  disclaimer: 'This assessment provides guidance only and does not constitute professional advice.',
  privacy: 'Data is processed locally and in compliance with applicable privacy regulations.',
  terms: 'Use of this platform is subject to our Terms of Service and Privacy Policy.',
} as const;

/**
 * External links and resources
 */
export const EXTERNAL_LINKS = {
  website: 'https://www.inference-stack.com',
  contact: 'https://www.inference-stack.com/#contact',
  documentation: 'https://docs.inference-stack.com/polydra',
  support: 'mailto:support@inference-stack.com',
  github: 'https://github.com/reactlabs-dev/polydraiq',
} as const;