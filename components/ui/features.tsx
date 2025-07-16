'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicBento from './Bento';

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
              start: 'top 80%',
              end: 'bottom 20%',
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
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, featuresRef);

      return () => ctx.revert();
    }
  }, []);

 

  return (
    <section id="features" ref={featuresRef} className="w-full max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="feature-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, collaborate, and grow as a developer
          </p>
        </div>
      </div>

      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={0}
        glowColor="32, 200, 255"
      />
    </section>
  );
};

export default Features;
