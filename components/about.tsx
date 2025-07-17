'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Users, Zap, Target } from 'lucide-react';
import { LayoutGroup, motion } from "motion/react"
import { TextRotate } from "@/components/ui/text-rotate"

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
      <div className="w-full h-full text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overusedGroteskdark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
      <LayoutGroup>
        <motion.p className="flex whitespace-pre" layout>
          <motion.span
            className="pt-0.5 sm:pt-1 md:pt-2"
            layout
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          >
            Make it{' '}
          </motion.span>
          <TextRotate
            texts={['work!', 'fancy ✽', 'right', 'fast', 'fun', 'rock', '🕶️🕶️🕶️']}
            mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#43afbe] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.p>
      </LayoutGroup>
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
    </section>
  );
};

export default About;
