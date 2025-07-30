import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProfileEditor from '../../../components/ui/profile-editor';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {/* Back Button */}
      <div className="w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Home
        </Link>
      </div>
      
      {/* Profile Section */}
      <section id="profile" className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <User size={24} className="text-primary" />
          <h2 className="font-bold text-2xl">Profile</h2>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">User Details</h3>
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto bg-muted">
            {JSON.stringify(data.user, null, 2)}
          </pre>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Email:</span>
              <span className="text-foreground/80">{data.user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">User ID:</span>
              <span className="text-foreground/80 font-mono text-sm">{data.user.id}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">Last Sign In:</span>
              <span className="text-foreground/80">
                {data.user.last_sign_in_at
                  ? new Date(data.user.last_sign_in_at).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Editor Section */}
      <ProfileEditor user={data.user} />
    </div>
  );
}
