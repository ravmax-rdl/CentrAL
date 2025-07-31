'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Page() {
  return (
    <Suspense fallback={<LoadingVerification />}>
      <VerificationHandler />
    </Suspense>
  );
}

function LoadingVerification() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Loading...</CardTitle>
              <CardDescription>Please wait</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

function VerificationHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleEmailVerification = async () => {
      const code = searchParams.get('code');

      if (!code) {
        setStatus('error');
        setErrorMessage('No verification code found in URL');
        return;
      }

      const supabase = createClient();

      try {
        // Exchange the code for a session using PKCE flow
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error('Verification error:', error);
          setStatus('error');
          setErrorMessage(error.message || 'Failed to verify email');
          return;
        }

        if (data.session) {
          setStatus('success');
          // Redirect to protected area after a short delay
          setTimeout(() => {
            router.push('/protected');
          }, 2000);
        } else {
          setStatus('error');
          setErrorMessage('No session created after verification');
        }
      } catch (error) {
        console.error('Unexpected error during verification:', error);
        setStatus('error');
        setErrorMessage('An unexpected error occurred during verification');
      }
    };

    handleEmailVerification();
  }, [searchParams, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Verifying Email...</CardTitle>
                <CardDescription>Please wait while we verify your email address</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-2xl">Verification Failed</CardTitle>
                <CardDescription>There was a problem verifying your email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">{errorMessage}</p>
                <div className="space-y-2">
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/auth/sign-up">Try Signing Up Again</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/login">Sign In Instead</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Email Verified!</CardTitle>
              <CardDescription>Your email has been successfully verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Your account is now active. Redirecting you to your dashboard...
              </p>
              <p className="text-xs text-muted-foreground text-center">
                If you&apos;re not redirected automatically, click below:
              </p>
              <Button asChild className="w-full">
                <Link href="/protected">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
