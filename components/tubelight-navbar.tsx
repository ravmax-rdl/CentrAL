'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home,
  User,
  Briefcase,
  FileText,
  Star,
  Users,
  BookOpen,
  Github,
  LucideIcon,
} from 'lucide-react';
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
  star: Star,
  users: Users,
  bookOpen: BookOpen,
  github: Github,
};

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  // Add scroll listener to update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Special handling for Home section - active when scroll is less than 50% of viewport height
      if (scrollPosition < viewportHeight * 0.5) {
        setActiveTab('Home');
        return;
      }

      // For other sections, find which section's top is closest to the current scroll position
      let currentSection = 'Home';
      let closestDistance = Infinity;

      for (const item of items) {
        if (item.url.startsWith('#') && item.name !== 'Home') {
          const element = document.querySelector(item.url) as HTMLElement;
          if (element) {
            // Get the actual position of the element
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + scrollPosition;

            // Check if this section is currently in view or has been passed
            const sectionStart = elementTop - 200; // Start considering section 200px before it appears
            const sectionEnd = elementTop + element.offsetHeight;

            // If we're within or past this section's range
            if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
              currentSection = item.name;
              break;
            }

            // Fallback: find section closest to current scroll position
            if (scrollPosition >= sectionStart) {
              const distance = Math.abs(scrollPosition - elementTop);
              if (distance < closestDistance) {
                closestDistance = distance;
                currentSection = item.name;
              }
            }
          }
        }
      }

      setActiveTab(currentSection);
    };

    // Initial check
    handleScroll();

    // Debounced scroll handler for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [items]);

  const handleClick = (item: NavItem) => {
    setActiveTab(item.name);

    // Handle smooth scrolling for hash links
    if (item.url.startsWith('#')) {
      // Special handling for Home section
      if (item.name === 'Home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return;
      }

      const element = document.querySelector(item.url) as HTMLElement;
      if (element) {
        // Get the actual position of the element relative to the document
        const elementRect = element.getBoundingClientRect();
        const currentScrollTop = window.scrollY;
        const elementTop = elementRect.top + currentScrollTop;

        // Calculate target position with a reasonable offset for better visibility
        // Scroll to show the section nicely in the viewport, not right at the top
        const offset = 150; // Adjusted offset for better section visibility
        const targetPosition = elementTop - offset;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

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
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleClick(item);
              }}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-3 sm:px-6 py-2 rounded-full transition-colors',
                'text-foreground/80 hover:text-primary',
                isActive && 'bg-[#40404080] text-primary'
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
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-white rounded-t-lg shadow-sm" />

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
