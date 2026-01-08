import { ReactNode } from 'react';

import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from 'react-error-boundary';

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="border-destructive/20 bg-destructive/5 flex items-center justify-center rounded-lg border p-4">
      <p className="text-destructive text-sm">
        {error?.message || 'Something went wrong'}
      </p>
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
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
