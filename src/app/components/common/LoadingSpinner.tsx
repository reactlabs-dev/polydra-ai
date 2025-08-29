/**
 * @fileoverview Loading Spinner component for async operations
 * @version 1.0.0
 * @author Matt Vegas <matt.vegas@inference-stack.com>
 * @company Inference Stack
 * @license AGPL-3.0
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  color?: string;
  className?: string;
}

/**
 * Loading Spinner component for indicating async operations
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message,
  color = '#0ea5e9',
  className = ''
}) => {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60
  };

  const spinnerSize = sizeMap[size];

  const spinnerStyle: React.CSSProperties = {
    width: spinnerSize,
    height: spinnerSize,
    border: `${spinnerSize / 10}px solid #f3f3f3`,
    borderTop: `${spinnerSize / 10}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: message ? '0 auto 16px' : '0 auto'
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  return (
    <div style={containerStyle} className={className}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={spinnerStyle}
        role="status"
        aria-label={message || 'Loading...'}
      />
      {message && (
        <span style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center' }}>
          {message}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;