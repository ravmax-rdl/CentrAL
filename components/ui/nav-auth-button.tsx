import Link from 'next/link';
import { Button } from './button';
import { createClient } from '@/lib/supabase/server';
import { NavLogoutButton } from './nav-logout-button';
import { User, LogIn } from 'lucide-react';

export async function NavAuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1">
      <div className="flex items-center gap-1 sm:gap-2 text-sm text-foreground/80">
        <User size={16} />
        <span className="font-medium hidden sm:inline text-xs sm:text-sm">
          {user.email?.split('@')[0]}
        </span>
      </div>
      <div className="w-px h-4 bg-border/50 hidden sm:block" />
      <NavLogoutButton />
    </div>
  ) : (
    <div className="flex gap-1 px-1 sm:px-2 py-1">
      <Button
        asChild
        size="sm"
        variant={'outline'}
        className="h-8 px-2 sm:px-3 rounded-full text-xs sm:text-sm"
      >
        <Link href="/auth/login" className="flex items-center gap-1">
          <LogIn size={14} />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      </Button>
      <Button
        asChild
        size="sm"
        variant={'default'}
        className="h-8 px-2 sm:px-3 rounded-full text-xs sm:text-sm"
      >
        <Link href="/auth/sign-up" className="flex items-center gap-1">
          <User size={14} />
          <span className="hidden sm:inline">Sign up</span>
        </Link>
      </Button>
    </div>
  );
}
