
import Footer from '@/components/footer';
import { UserPanel } from '@/components/ui/user-panel';



export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">

        {/* User Panel */}
        <UserPanel />

        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5 pt-20">{children}</div>

        <Footer />
      </div>
    </main>
  );
}
