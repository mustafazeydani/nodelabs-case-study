'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html>
      <body>
        <div className="from-background to-secondary/20 flex min-h-screen items-center justify-center bg-linear-to-br p-4">
          <div className="w-full max-w-md">
            <div className="bg-card border-primary/20 rounded-lg border p-8 shadow-lg">
              {/* Error Icon */}
              <div className="mb-6 flex justify-center">
                <div className="bg-primary/10 rounded-full p-4">
                  <svg
                    className="text-primary h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4v2m0 4v2M7.46 4.46l1.41 1.41m5.68 5.68l1.41 1.41M4.46 16.54l1.41 1.41m5.68-5.68l1.41 1.41M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-primary mb-2 text-center text-2xl font-bold">
                Oops! Something went wrong
              </h1>

              {/* Description */}
              <p className="text-muted-foreground mb-6 text-center text-sm">
                We encountered an unexpected error. Please try again or contact
                support if the problem persists.
              </p>

              {/* Error Message (Dev Only) */}
              {isDev && (
                <div className="bg-destructive/10 border-destructive/30 mb-6 rounded border p-4">
                  <p className="text-destructive font-mono text-xs wrap-break-word">
                    {error?.message || 'Unknown error'}
                  </p>
                  {error?.digest && (
                    <p className="text-destructive/70 mt-2 text-xs">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <Button onClick={() => reset()} className="flex-1">
                  Try Again
                </Button>
                <Button
                  onClick={() => (window.location.href = '/')}
                  variant="outline"
                  className="flex-1"
                >
                  Go Home
                </Button>
              </div>

              <p className="text-muted-foreground mt-6 text-center text-xs">
                Need help?{' '}
                <Link
                  href="/help"
                  className="text-primary font-medium hover:underline"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
