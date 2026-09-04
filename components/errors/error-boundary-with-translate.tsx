'use client';

import { ReactNode } from 'react';
import { ErrorBoundary, type ErrorBoundaryVariant } from './error-boundary';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  variant?: ErrorBoundaryVariant;
  onReset?: () => void;
}

export function ErrorBoundaryWithTranslation({ children, fallback, variant, onReset }: Props) {
  const messages = {
    title: 'Something went wrong',
    description: 'Please try again later or contact support if the problem persists.',
    tryAgain: 'Try again',
    sectionError: 'This section has encountered an error.',
  };

  return (
    <ErrorBoundary variant={variant} fallback={fallback} onReset={onReset} messages={messages}>
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWithTranslation;
