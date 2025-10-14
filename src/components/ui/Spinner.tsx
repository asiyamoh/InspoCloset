import clsx from 'clsx';
import React from 'react';

export const styles = {
  base: [
    'animate-spin rounded-full border-solid border-current',
  ],
  sizes: {
    sm: 'h-4 w-4 border-2',
    base: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-2',
    xl: 'h-12 w-12 border-4',
  },
  colors: {
    primary: 'border-dustyRose border-t-transparent',
    secondary: 'border-sageGreen border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  },
};

type SpinnerProps = {
  size?: keyof typeof styles.sizes;
  color?: keyof typeof styles.colors;
  className?: string;
};

export function Spinner({ 
  size = 'base', 
  color = 'primary', 
  className 
}: SpinnerProps) {
  return (
    <div
      className={clsx(
        styles.base,
        styles.sizes[size],
        styles.colors[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Full screen loading overlay
type LoadingOverlayProps = {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
};

export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = 'Loading...' 
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="lg" />
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
