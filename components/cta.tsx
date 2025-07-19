'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Users, Zap, Globe } from 'lucide-react';
// import FlipLink from './ui/text-effect-flipper';
import WrapButton from './ui/wrap-button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CTA: React.FC = () => {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ctaRef.current) {
      const ctx = gsap.context(() => {
        // Create scroll animations - content is visible by default
        gsap.fromTo(
          '.cta-content',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.cta-card',
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.cta-cards',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, ctaRef);

      return () => ctx.revert();
    }
  }, []);

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '10K+',
      label: 'Active Students',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      value: '50K+',
      label: 'Forum Posts',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '99.9%',
      label: 'Uptime',
    },
  ];

  return (
    <section id="cta" ref={ctaRef} className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="mb-16 text-center">
        <div className="feature-header">
          <h2 className="text-7xl md:text-8xl font-serif pb-1 mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            <span className="italic">Ready to Join centrAL?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Placeholder
          </p>
        </div>

        <div className="w-full flex justify-center">
          <WrapButton className="mt-10" href="/auth/sign-up">
            <Globe className="animate-spin" />
            Get started
          </WrapButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="cta-content text-center p-6 rounded-2xl border bg-card transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="cta-cards grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* <FlipLink href="https://x.com/guri_who">Twitter</FlipLink>
        <FlipLink href="https://github.com">GitHub</FlipLink>
        <FlipLink href="https://behance.net">Behance</FlipLink> */}
      </div>
    </section>
  );
};

export default CTA;
