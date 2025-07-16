import { UserPanel } from '@/components/ui/user-panel';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Hero } from '@/components/ui/hero';
import About from '@/components/ui/about';
import Features from '@/components/ui/features';
import Contributors from '@/components/ui/contributors';
import CTA from '@/components/ui/cta';
import SubjectList from '@/components/ui/subject-list';

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
        <About />
        <Features />
        <Contributors />
        <SubjectList />
        <CTA />
      </div>
      <footer className="w-full h-16 flex items-center justify-center border-t border-t-foreground/10 text-center text-xs">
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
