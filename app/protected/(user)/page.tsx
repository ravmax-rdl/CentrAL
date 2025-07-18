import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { InfoIcon, User, Briefcase, BookOpen, Star, Github, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
      {/* Dashboard Section */}
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Welcome to your Dashboard</h2>
        <p className="text-foreground/80 mb-6">
          Manage your profile, projects, and access learning resources all in one place.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={20} className="text-primary" />
              <h3 className="font-semibold">Projects</h3>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-foreground/60">Active projects</p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-primary" />
              <h3 className="font-semibold">Resources</h3>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-foreground/60">Saved resources</p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={20} className="text-primary" />
              <h3 className="font-semibold">Achievements</h3>
            </div>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-foreground/60">Milestones reached</p>
          </div>
        </div>
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

      {/* Projects Section */}
      <section id="projects" className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase size={24} className="text-primary" />
          <h2 className="font-bold text-2xl">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">React Dashboard</h3>
            <p className="text-foreground/80 mb-4">
              A comprehensive dashboard built with React and TypeScript.
            </p>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">React</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                TypeScript
              </span>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Mobile App</h3>
            <p className="text-foreground/80 mb-4">
              Cross-platform mobile application using React Native.
            </p>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                React Native
              </span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Expo</span>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">API Gateway</h3>
            <p className="text-foreground/80 mb-4">
              Microservices API gateway built with Node.js and Express.
            </p>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Node.js</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Express</span>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 border-dashed opacity-60">
            <h3 className="font-semibold text-lg mb-2">New Project</h3>
            <p className="text-foreground/80 mb-4">Start a new project to expand your portfolio.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm hover:bg-primary/90 transition-colors">
              + Create Project
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={24} className="text-primary" />
          <h2 className="font-bold text-2xl">Learning Resources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Github size={16} />
              <h3 className="font-semibold">React Documentation</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-3">
              Official React documentation and tutorials.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              View Resource →
            </a>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} />
              <h3 className="font-semibold">TypeScript Handbook</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-3">
              Complete guide to TypeScript features and best practices.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              View Resource →
            </a>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} />
              <h3 className="font-semibold">Next.js Tutorial</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-3">
              Learn Next.js framework for production-ready apps.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              View Resource →
            </a>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Github size={16} />
              <h3 className="font-semibold">Supabase Docs</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-3">
              Backend-as-a-Service platform documentation.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              View Resource →
            </a>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} />
              <h3 className="font-semibold">Tailwind CSS</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-3">
              Utility-first CSS framework for rapid UI development.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              View Resource →
            </a>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} />
              <h3 className="font-semibold">Design Patterns</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-3">
              Software design patterns and architectural principles.
            </p>
            <a href="#" className="text-primary text-sm hover:underline">
              View Resource →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
