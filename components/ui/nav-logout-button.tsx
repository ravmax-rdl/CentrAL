'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function NavLogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <Button
      onClick={logout}
      size="sm"
      variant="ghost"
      className="h-8 px-2 sm:px-3 rounded-full hover:bg-destructive/10 hover:text-destructive text-xs sm:text-sm"
    >
      <LogOut size={14} />
      <span className="hidden sm:inline ml-1">Logout</span>
    </Button>
  );
}
