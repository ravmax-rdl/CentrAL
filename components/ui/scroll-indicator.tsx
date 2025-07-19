'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { scrollToContent } from '@/lib/scroll-utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollIndicator: React.FC = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && indicatorRef.current) {
      const ctx = gsap.context(() => {
        // Animate the indicator bouncing
        gsap.to(indicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
        });

        // Fade out the indicator as user scrolls
        gsap.to(indicatorRef.current, {
          opacity: 0,
          scale: 0.8,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '200px top',
            scrub: 1,
          },
        });
      }, indicatorRef);

      return () => ctx.revert();
    }
  }, []);

  const scrollToContentHandler = () => {
    scrollToContent();
  };

  return (
    <div
      ref={indicatorRef}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={scrollToContentHandler}
    >
      <div className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-300">
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/60 transition-colors duration-300">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
