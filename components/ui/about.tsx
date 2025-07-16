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
        // Create scroll animations - content is visible by default
        gsap.fromTo(
          '.about-text',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.about-card',
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.about-cards',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
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
            className="about-card relative p-6 rounded-xl border bg-card transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>

            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
      <Rotate />
    </section>
  );
};

export default About;
