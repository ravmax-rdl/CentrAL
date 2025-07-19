'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LayeredScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const LayeredScrollContent: React.FC<LayeredScrollProps> = ({
  children,
  className = '',
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && contentRef.current) {
      const ctx = gsap.context(() => {
        // Animate the content sliding up with a nice easing
        gsap.fromTo(
          contentRef.current,
          {
            y: 150,
            opacity: 0.6,
            scale: 0.92,
            rotateX: 5,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 95%',
              end: 'top 20%',
              scrub: 1.5,
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Add subtle parallax effect
        gsap.to(contentRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });

        // Add a subtle fade effect for the border
        gsap.fromTo(
          contentRef.current,
          {
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
          },
          {
            borderTopColor: 'rgba(255, 255, 255, 0.3)',
            duration: 1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }, contentRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <div
      ref={contentRef}
      className={`layered-content bg-background/95 backdrop-blur-sm border-t border-border/20 rounded-t-3xl shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
};

export default LayeredScrollContent;
