/**
 * @fileoverview Error Boundary component for graceful error handling
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import React from 'react';
import { ErrorUtils } from '@/utils';
import { AppError } from '@/types';

interface ErrorBoundaryState {
  hasError: boolean;
  error: AppError | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: AppError; resetError: () => void }>;
  onError?: (error: AppError) => void;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child
 * component tree and displays a fallback UI instead of crashing the entire application.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const appError = ErrorUtils.normalizeError(error);
    return { hasError: true, error: appError };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const appError = ErrorUtils.normalizeError(error);
    ErrorUtils.logError(appError, { errorInfo });
    this.props.onError?.(appError);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div style={{
          padding: '20px',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          margin: '10px 0'
        }}>
          <h3>Something went wrong</h3>
          <p>{this.state.error.message}</p>
          <button onClick={this.resetError} style={{
            backgroundColor: '#721c24',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;