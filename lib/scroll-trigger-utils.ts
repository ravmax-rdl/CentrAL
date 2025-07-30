/**
 * Scroll trigger utilities for responsive animations
 */

// Standard trigger points optimized for different viewport sizes
export const TRIGGER_POINTS = {
  // Content animation triggers
  CONTENT_EARLY: 'top 85%', // For early content reveals
  CONTENT_NORMAL: 'top 75%', // Standard content reveal
  CONTENT_LATE: 'top 70%', // For detailed animations

  // Text and header triggers
  TEXT_REVEAL: 'top 75%', // For text animations
  HEADER_REVEAL: 'top 75%', // For headers

  // Card and grid triggers
  CARD_REVEAL: 'top 70%', // For card animations
  GRID_REVEAL: 'top 70%', // For grid animations

  // Footer and bottom content
  FOOTER_REVEAL: 'top bottom-=50',

  // End points for scrub animations
  CONTENT_END: 'bottom 25%', // Standard end point
  HERO_END: 'bottom top', // For hero parallax
} as const;

// Responsive trigger configuration
export const getResponsiveTrigger = (
  defaultTrigger: string,
  options?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  }
) => {
  if (typeof window === 'undefined') return defaultTrigger;

  const width = window.innerWidth;

  if (width < 768 && options?.mobile) {
    return options.mobile;
  } else if (width < 1024 && options?.tablet) {
    return options.tablet;
  } else if (width >= 1024 && options?.desktop) {
    return options.desktop;
  }

  return defaultTrigger;
};

// Standard scroll trigger configuration
export const createScrollTrigger = (
  trigger: Element | string,
  startPoint: string = TRIGGER_POINTS.CONTENT_NORMAL,
  endPoint?: string,
  options?: {
    scrub?: boolean | number;
    toggleActions?: string;
    once?: boolean;
  }
) => {
  const config: {
    trigger: Element | string;
    start: string;
    end?: string;
    toggleActions?: string;
    scrub?: boolean | number;
    once?: boolean;
  } = {
    trigger,
    start: startPoint,
    toggleActions: options?.toggleActions || 'play none none reverse',
  };

  if (endPoint) {
    config.end = endPoint;
  }

  if (options?.scrub !== undefined) {
    config.scrub = options.scrub;
  }

  if (options?.once) {
    config.once = true;
  }

  return config;
};

// Optimized animation durations for different screen sizes
export const getResponsiveDuration = (baseDuration: number) => {
  if (typeof window === 'undefined') return baseDuration;

  const width = window.innerWidth;

  // Slightly faster animations on mobile for better performance
  if (width < 768) {
    return baseDuration * 0.8;
  }

  return baseDuration;
};

// Stagger delays optimized for different screen sizes
export const getResponsiveStagger = (baseStagger: number) => {
  if (typeof window === 'undefined') return baseStagger;

  const width = window.innerWidth;

  // Shorter stagger on mobile for quicker animations
  if (width < 768) {
    return baseStagger * 0.7;
  }

  return baseStagger;
};
