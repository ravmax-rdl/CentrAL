'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Users, Zap, Target } from 'lucide-react';
import { Rotate } from './text-flip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && aboutRef.current) {
      const ctx = gsap.context(() => {
        // Create scroll animations - enhanced for layered scroll
        gsap.fromTo(
          '.about-text',
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.about-card',
          { scale: 0.8, opacity: 0, y: 60 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.about-cards',
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Add floating animation to cards
        gsap.to('.about-card', {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.5,
        });
      }, aboutRef);

      return () => ctx.revert();
    }
  }, []);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Developer-First',
      description: 'Built by developers, for developers. We understand your workflow.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Driven',
      description: 'Join thousands of developers sharing knowledge and growing together.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with modern web technologies.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Focused Experience',
      description: 'Clean, minimal interface that lets you focus on what matters.',
    },
  ];

  return (
    <section id="about" ref={aboutRef} className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="about-text text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          About centrAL
        </h2>
        <p className="about-text text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          centrAL is a modern platform designed to bring developers together, fostering
          collaboration and innovation in the tech community. We&apos;re building the future of
          developer networking.
        </p>
      </div>

      <div className="about-cards grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="about-card relative p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-500 group hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <div className="text-primary">{feature.icon}</div>
            </div>

            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>

            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <Rotate />
      </div>
    </section>
  );
};

export default About;
