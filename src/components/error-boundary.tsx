import { ReactNode } from 'react';

import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary';

import { RefreshAccessToken } from './refresh-access-token';
import { Button } from './ui/button';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center gap-4 rounded-lg border p-4">
      <p className="text-destructive text-sm">
        {error?.message || 'Something went wrong'}
      </p>
      <Button onClick={resetErrorBoundary}>Retry</Button>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

export function ErrorBoundary({
  children,
  fallback,
  onError,
}: ErrorBoundaryProps) {
  const DefaultFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    if (error.message === 'Unauthorized' && typeof window !== 'undefined') {
      return <RefreshAccessToken />;
    }
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    );
  };

  return (
    <ReactErrorBoundary FallbackComponent={DefaultFallback} onError={onError}>
      {children}
    </ReactErrorBoundary>
  );
}
