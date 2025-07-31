import { UpdatePasswordForm } from '@/components/ui/update-password-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="flex min-h-[100svh] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>Loading...</div>}>
          <UpdatePasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
