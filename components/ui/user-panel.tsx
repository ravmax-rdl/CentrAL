import { NavAuthButton } from './nav-auth-button';
import { EnvVarWarning } from './env-var-warning';
import { hasEnvVars } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface UserPanelProps {
  className?: string;
}

export function UserPanel({ className }: UserPanelProps) {
  return (
    <div
      className={cn(
        'fixed top-6 right-4 sm:right-6 z-50',
        'w-fit max-w-[calc(100vw-2rem)]', // Responsive width with padding
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-background/5 border border-gray-800 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg overflow-hidden">
        {!hasEnvVars ? <EnvVarWarning /> : <NavAuthButton />}
      </div>
    </div>
  );
}
