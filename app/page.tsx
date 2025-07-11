import { EnvVarWarning } from '@/components/env-var-warning';
import { AuthButton } from '@/components/auth-button';
import { Hero } from '@/components/hero';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { hasEnvVars } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <Link href={'/'}>centrAL</Link>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <Hero />
        {/* About */}
        {/* Features */}
        {/* Contributors */}
        {/* List */}
        {/* forum redirect or general cta */}
      </div>
      <footer className="w-full h-16 flex items-center justify-center border-t border-t-foreground/10 text-center text-xs">
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
