import { UserPanel } from '@/components/ui/user-panel';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { NavBar } from '@/components/tubelight-navbar';
import { Hero } from '@/components/hero';
import About from '@/components/about';
import Features from '@/components/features';
import Contributors from '@/components/contributors';
import CTA from '@/components/cta';
import SubjectList from '@/components/subject-list';
import { LayeredScrollContent } from '@/components/ui/layered-scroll';
import ScrollIndicator from '@/components/ui/scroll-indicator';

export default function Home() {
  const navItems = [
    { name: 'Home', url: '#home', icon: 'home' },
    { name: 'About', url: '#about', icon: 'user' },
    { name: 'Features', url: '#features', icon: 'star' },
    { name: 'Team', url: '#contributors', icon: 'users' },
    { name: 'Projects', url: '#projects', icon: 'bookOpen' },
    { name: 'Contact', url: '#cta', icon: 'briefcase' },
  ];

  return (
    <main className="min-h-screen relative layered-scroll-container">
      {/* Fixed Hero Background */}
      <div className="fixed inset-0 z-0">
        <Hero />
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-5 left-0 right-0 z-30 flex justify-center">
        <UserPanel />
      </div>
      <div className="fixed top-20 left-0 right-0 z-30 flex justify-center">
        <NavBar items={navItems} />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Scrollable Content Layer */}
      <div className="relative z-20">
        {/* Spacer to allow hero to be visible initially */}
        <div className="h-screen"></div>

        {/* Layered Content */}
        <LayeredScrollContent>
          <div className="flex flex-col gap-20 items-center py-20">
            <About />
            <Features />
            <Contributors />
            <SubjectList />
            <CTA />
          </div>
          <footer className="w-full h-16 flex items-center justify-center border-t border-t-foreground/10 text-center text-xs">
            <ThemeSwitcher />
          </footer>
        </LayeredScrollContent>
      </div>
    </main>
  );
}
