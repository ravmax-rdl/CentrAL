'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
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
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const { resolvedTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Initialize container width immediately
    setContainerWidth(window.innerWidth);
  }, []);

  // Monitor viewport changes using window resize event
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Set initial container width
    handleResize();

    return () => {
      // Clean up event listener on unmount
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine position based on container width (equivalent to container queries)
  // Mobile: < 640px = bottom, Desktop: >= 640px = top
  const isMobileSize = containerWidth < 640;
  const navPosition = isMobileSize ? 'bottom-4' : 'top-6';

  // Add scroll listener to update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Special handling for Home section - active when scroll is less than viewport height
      if (scrollPosition < viewportHeight * 0.8) {
        setActiveTab('Home');
        return;
      }

      // For other sections, find which section is currently most visible
      let currentSection = 'Home';
      let bestMatch = -1;

      for (const item of items) {
        if (item.url.startsWith('#') && item.name !== 'Home') {
          const element = document.querySelector(item.url) as HTMLElement;
          if (element) {
            // Get the actual position of the element
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + scrollPosition;
            const elementBottom = elementTop + element.offsetHeight;

            // Calculate how much of the section is in the viewport
            const viewportTop = scrollPosition + 100; // Account for fixed navbar
            const viewportBottom = scrollPosition + viewportHeight;

            // Check if section is in viewport
            const isInViewport = elementBottom > viewportTop && elementTop < viewportBottom;

            if (isInViewport) {
              // Calculate visibility percentage
              const visibleTop = Math.max(elementTop, viewportTop);
              const visibleBottom = Math.min(elementBottom, viewportBottom);
              const visibleHeight = visibleBottom - visibleTop;
              const visibilityPercentage = visibleHeight / (viewportBottom - viewportTop);

              if (visibilityPercentage > bestMatch) {
                bestMatch = visibilityPercentage;
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

        // Calculate target position to center the section in the viewport
        const viewportHeight = window.innerHeight;
        const elementHeight = element.offsetHeight;

        // Try to center the section, but ensure it's fully visible
        let offset = (viewportHeight - elementHeight) / 2;
        offset = Math.max(offset, 100); // Minimum offset for fixed navbar
        offset = Math.min(offset, 200); // Maximum offset to avoid too much spacing

        const targetPosition = elementTop - offset;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      {/* Logo Section */}
      <div className="fixed top-6 left-6 z-40">
        <div className="flex items-center justify-center bg-background/5 border border-gray-800 backdrop-blur-lg p-3 rounded-full shadow-lg">
          {mounted ? (
            <Image
              src={resolvedTheme === 'light' ? '/images/logodark.svg' : '/images/logowhite.svg'}
              alt="CentrAL Logo"
              width={60}
              height={12}
              className="w-16 h-4 sm:w-20 sm:h-5"
            />
          ) : (
            <div className="w-16 h-4 sm:w-20 sm:h-5 bg-muted animate-pulse rounded" />
          )}
        </div>
      </div>

      {/* Navigation Bar with Container Query Support */}
      <div
        ref={navRef}
        className={cn(
          'fixed left-1/2 -translate-x-1/2 z-40',
          'w-fit max-w-[calc(100vw-2rem)]', // Responsive width with padding
          // Dynamic positioning based on container width (container query equivalent)
          navPosition,
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
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 sm:w-10 h-1 bg-white rounded-t-lg shadow-sm" />

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
    </>
  );
}
