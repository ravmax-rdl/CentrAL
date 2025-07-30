'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturesGrid } from './ui/features-grid';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && featuresRef.current) {
      const ctx = gsap.context(() => {
        // Create scroll animations - content is visible by default
        gsap.fromTo(
          '.feature-card',
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.feature-header',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, featuresRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      id="features"
      ref={featuresRef}
      className="w-full max-w-full mx-auto px-10 md:px-60 py-10"
    >
      <div className="mb-16">
        <div className="feature-header">
          <h2 className="text-7xl md:text-9xl font-serif my-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-left">
            <p className="inline italic">Impactful</p> Features
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-left">
            Everything you need to learn, grow, and collaborate as a student.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <FeaturesGrid />
      </div>
    </section>
  );
};

export default Features;
