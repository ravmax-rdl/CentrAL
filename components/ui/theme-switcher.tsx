'use client';

import { Button } from '@/components/ui/button';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />;
  }

  const themes = [
    {
      name: 'light',
      icon: Sun,
      label: 'Light',
      color: 'text-yellow-500 dark:text-yellow-400',
    },
    {
      name: 'dark',
      icon: Moon,
      label: 'Dark',
      color: 'text-blue-500 dark:text-blue-400',
    },
    {
      name: 'system',
      icon: Monitor,
      label: 'System',
      color: 'text-gray-500 dark:text-gray-400',
    },
  ];

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  const cycleTheme = () => {
    const currentIndex = themes.findIndex((t) => t.name === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].name);
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        onClick={cycleTheme}
        className="relative h-9 w-9 rounded-full p-0 hover:bg-accent/80 transition-all duration-300 hover:scale-110 border border-border/50 hover:border-border"
        aria-label={`Current: ${currentTheme.label}. Click to switch to ${themes[(themes.findIndex((t) => t.name === theme) + 1) % themes.length].label}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CurrentIcon
              size={16}
              className={`${currentTheme.color} transition-colors duration-200`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated pulse ring on theme change */}
        <motion.div
          key={`pulse-${theme}`}
          className="absolute inset-0 rounded-full border-2 opacity-0"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.5, 0.2, 0],
            borderColor:
              resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(234, 179, 8, 0.6)',
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      </Button>

      {/* Enhanced tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:-translate-y-1">
        <div className="bg-popover/95 backdrop-blur-sm text-popover-foreground px-3 py-2 rounded-md text-xs whitespace-nowrap border shadow-lg">
          <div className="flex items-center gap-2">
            <CurrentIcon size={12} className={currentTheme.color} />
            <span className="font-medium">{currentTheme.label}</span>
            <span className="text-muted-foreground">theme</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-1 text-center">Click to cycle</div>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover/95" />
      </div>
    </div>
  );
};

export { ThemeSwitcher };
