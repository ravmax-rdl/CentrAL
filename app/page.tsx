import { UserPanel } from '@/components/ui/user-panel';
import { Hero } from '@/components/ui/hero';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import FlipLink from '../components/ui/text-effect-flipper';
import WrapButton from '@/components/ui/wrap-button';
import { Globe } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Rotate } from '@/components/ui/text-flip';
import MagicBento from '@/components/ui/Bento';

export default function Home() {
  const navItems = [
    { name: 'Home', url: '/', icon: 'home' },
    { name: 'About', url: '#about', icon: 'user' },
    { name: 'Projects', url: '#projects', icon: 'briefcase' },
    { name: 'Resume', url: '#resume', icon: 'fileText' },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 w-full flex flex-col gap-20 items-center mt-20">
        <UserPanel />
        <NavBar items={navItems} />
        <Hero />
        <div className="w-full flex align-middle">
          <div className="w-full flex justify-center items-center">
            <WrapButton className="mt-10" href="/auth/login">
              <Globe className="animate-spin" />
              Get started
            </WrapButton>
          </div>
        </div>
        <FlipLink href="https://x.com/guri_who">Behance</FlipLink>
        
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={0}
          glowColor="32, 200, 255"
        />
        <Rotate />
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
