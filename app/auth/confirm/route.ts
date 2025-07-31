import { createClient } from '@/lib/supabase/server';
import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/protected';

  // Handle new PKCE flow with code parameter
  if (code) {
    // Check if this is a password reset by looking at the 'next' parameter
    // Password reset emails should have redirectTo set to /auth/update-password
    if (next === '/auth/update-password' || next.includes('/auth/update-password')) {
      redirect(`/auth/update-password?code=${code}`);
    } else {
      // Redirect to the verified page which will handle the code exchange for email verification
      redirect(`/auth/verified?code=${code}`);
    }
  }

  // Handle legacy flow with token_hash and type
  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or protected area
      redirect(next);
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${encodeURIComponent(error?.message || 'Verification failed')}`);
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=${encodeURIComponent('No verification code or token found')}`);
}
