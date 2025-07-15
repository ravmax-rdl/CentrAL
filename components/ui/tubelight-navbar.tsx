'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, User, Briefcase, FileText, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  url: string;
  icon: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  user: User,
  briefcase: Briefcase,
  fileText: FileText,
};

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  return (
    <div
      className={cn(
        'fixed bottom-4 sm:top-6 left-1/2 -translate-x-1/2 z-50',
        'w-fit max-w-[calc(100vw-2rem)]', // Responsive width with padding
        className
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-background/5 border border-gray-800 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg overflow-hidden">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-3 sm:px-6 py-2 rounded-full transition-colors',
                'text-foreground/80 hover:text-primary',
                isActive && 'bg-muted text-primary'
              )}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
