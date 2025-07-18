
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { UserPanel } from '@/components/ui/user-panel';



export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">

        {/* User Panel */}
        <UserPanel />

        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 pt-20">{children}</div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
