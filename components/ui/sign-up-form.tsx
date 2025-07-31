'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

// Email validation function
const validateEmailFormat = (email: string) => {
  const validations = [
    { test: /.+@.+\..+/, text: 'Valid email format', type: 'format' },
    {
      test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      text: 'No spaces or special characters',
      type: 'characters',
    },
    { test: /^[^.][^@]*@[^@]*[^.]$/, text: 'No leading/trailing dots', type: 'dots' },
    { test: /^[^@]{1,64}@[^@]{1,255}$/, text: 'Appropriate length', type: 'length' },
  ];

  return validations.map((validation) => ({
    ...validation,
    met: validation.test.test(email),
  }));
};

// Enhanced email validation
const isValidEmailDomain = (email: string): boolean => {
  const commonDomains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'protonmail.com',
    'aol.com',
    'mail.com',
    'zoho.com',
    'yandex.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // Check if it's a common domain or has proper TLD structure
  return commonDomains.includes(domain) || /^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain);
};

// Email suggestion function for common typos
const getSuggestedEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;

  const suggestions: { [key: string]: string } = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yahho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmil.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloook.com': 'outlook.com',
  };

  const suggested = suggestions[domain.toLowerCase()];
  return suggested ? `${localPart}@${suggested}` : email;
};

// Password strength validation function
const validatePasswordStrength = (password: string) => {
  const requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /\d/, text: 'One number' },
    { regex: /[^A-Za-z0-9]/, text: 'One special character' },
  ];

  return requirements.map((req) => ({
    ...req,
    met: req.regex.test(password),
  }));
};

// Calculate password strength score
const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  if (!password) return { score: 0, label: '', color: 'bg-gray-200' };

  const requirements = validatePasswordStrength(password);
  const metCount = requirements.filter((req) => req.met).length;

  if (metCount <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (metCount <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' };
  if (metCount <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-500' };
  if (metCount <= 4) return { score: 4, label: 'Strong', color: 'bg-green-500' };
  return { score: 5, label: 'Very Strong', color: 'bg-green-600' };
};

// Enhanced Zod schema for sign up with stronger email and password validation
const signUpSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' })
      .refine(
        (email) => {
          // Check for proper email structure
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        { message: 'Email format is invalid' }
      )
      .refine(
        (email) => {
          // Check domain validity
          return isValidEmailDomain(email);
        },
        { message: 'Please use a valid email domain' }
      )
      .refine(
        (email) => {
          // Check for common typos
          const commonTypos = ['gmial.com', 'gmai.com', 'yahooo.com', 'hotmial.com'];
          const domain = email.split('@')[1]?.toLowerCase();
          return !commonTypos.includes(domain);
        },
        { message: 'Please check your email domain for typos' }
      ),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    repeatPassword: z.string({ required_error: 'Please repeat your password' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });
type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // Watch both email and password fields for real-time validation
  const watchedEmail = watch('email', '');
  const watchedPassword = watch('password', '');
  const emailValidations = validateEmailFormat(watchedEmail);
  const passwordRequirements = validatePasswordStrength(watchedPassword);
  const passwordStrength = getPasswordStrength(watchedPassword);

  const handleSignUp = async (data: SignUpSchema) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `https://studyatcentral.com/auth/verified`,
        },
      });

      if (error) throw error;

      // Check the response to determine if this is a new user or existing user
      if (
        signUpData.user &&
        signUpData.user.identities &&
        signUpData.user.identities.length === 0
      ) {
        // User already exists - identities array will be empty for existing users
        setError(
          'An account with this email already exists. Please sign in instead or use a different email.'
        );
      } else if (signUpData.user) {
        // New user successfully created or user needs to confirm email
        router.push('/auth/sign-up-success');
      } else {
        // Unexpected response
        setError('Something went wrong. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle specific Supabase auth errors
        const errorMessage = error.message.toLowerCase();

        if (
          errorMessage.includes('user already registered') ||
          errorMessage.includes('email already registered') ||
          errorMessage.includes('email already in use') ||
          errorMessage.includes('user with this email already exists')
        ) {
          setError(
            'An account with this email already exists. Please sign in instead or use a different email.'
          );
        } else if (errorMessage.includes('password')) {
          setError('Password must be at least 6 characters long.');
        } else if (errorMessage.includes('email')) {
          setError('Please enter a valid email address.');
        } else if (errorMessage.includes('rate limit')) {
          setError('Too many signup attempts. Please wait a moment and try again.');
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSignUp)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'signup-email-error' : undefined}
                  className={cn(
                    errors.email && touchedFields.email
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : watchedEmail && emailValidations.every((v) => v.met)
                        ? 'border-green-500 focus-visible:ring-green-500'
                        : ''
                  )}
                  disabled={isLoading}
                />

                {/* Email Validation Feedback - Only show when there are unmet conditions */}
                {watchedEmail && touchedFields.email && emailValidations.some((v) => !v.met) && (
                  <div className="space-y-2">
                    {/* Email validation checklist - Only show unmet conditions */}
                    <div className="grid grid-cols-1 gap-1">
                      {emailValidations
                        .filter((validation) => !validation.met)
                        .map((validation, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <X className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-500">{validation.text}</span>
                          </div>
                        ))}
                    </div>

                    {/* Domain suggestion for common typos */}
                    {watchedEmail.includes('@') && !isValidEmailDomain(watchedEmail) && (
                      <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950 p-2 rounded">
                        💡 Did you mean: {getSuggestedEmail(watchedEmail)}?
                      </div>
                    )}
                  </div>
                )}

                {errors.email && touchedFields.email && (
                  <p id="signup-email-error" className="text-sm text-red-500" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'signup-password-error' : undefined}
                  className={cn(
                    errors.password && touchedFields.password
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  )}
                  disabled={isLoading}
                />

                {/* Password Strength Indicator - Only show when there are unmet requirements */}
                {watchedPassword && passwordRequirements.some((req) => !req.met) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={cn(
                            'h-2 rounded-full transition-all duration-300',
                            passwordStrength.color
                          )}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {passwordStrength.label}
                      </span>
                    </div>

                    {/* Password Requirements Checklist - Only show unmet requirements */}
                    <div className="grid grid-cols-1 gap-1">
                      {passwordRequirements
                        .filter((req) => !req.met)
                        .map((req, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <X className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-500">{req.text}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {errors.password && touchedFields.password && (
                  <p id="signup-password-error" className="text-sm text-red-500" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  {...register('repeatPassword')}
                  aria-invalid={!!errors.repeatPassword}
                  aria-describedby={
                    errors.repeatPassword ? 'signup-repeat-password-error' : undefined
                  }
                  className={cn(
                    errors.repeatPassword && touchedFields.repeatPassword
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  )}
                  disabled={isLoading}
                />
                {errors.repeatPassword && touchedFields.repeatPassword && (
                  <p
                    id="signup-repeat-password-error"
                    className="text-sm text-red-500"
                    role="alert"
                  >
                    {errors.repeatPassword.message}
                  </p>
                )}
              </div>
              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-950 p-3 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
                  {error.includes('already exists') && (
                    <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                      <Link href="/auth/login" className="underline hover:no-underline">
                        Try signing in instead
                      </Link>
                    </p>
                  )}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating an account...' : 'Sign up'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
