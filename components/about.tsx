'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutGroup, motion } from 'motion/react';
import { TextRotate } from '@/components/ui/text-rotate';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

  const features = [
    {
      word: 'Learn',
      color: 'from-blue-500/10 to-blue-600/5',
    },
    {
      word: 'Connect',
      color: 'from-blue-500/10 to-blue-600/5',
    },
    {
      word: 'Practice',
      color: 'from-blue-500/10 to-blue-600/5',
    },
    {
      word: 'Excel',
      color: 'from-blue-500/10 to-blue-600/5',
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && aboutRef.current) {
      const ctx = gsap.context(() => {
        // Animate the text elements
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

        // Floating tiles animation
        const tiles = gsap.utils.toArray('.floating-tile') as HTMLElement[];

        // Initial floating animation - reduced movement for less obstrusiveness
        tiles.forEach((tile: HTMLElement, index) => {
          gsap.set(tile, {
            x: gsap.utils.random(-100, 100),
            y: gsap.utils.random(-50, 50),
            rotation: gsap.utils.random(-5, 5),
          });

          gsap.to(tile, {
            y: `+=${gsap.utils.random(-15, 15)}`,
            x: `+=${gsap.utils.random(-10, 10)}`,
            rotation: `+=${gsap.utils.random(-5, 5)}`,
            duration: gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.8,
          });
        });

        // Cursor avoidance animation - reduced sensitivity
        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;

          tiles.forEach((tile: HTMLElement) => {
            const rect = tile.getBoundingClientRect();
            const tileCenterX = rect.left + rect.width / 2;
            const tileCenterY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
              Math.pow(clientX - tileCenterX, 2) + Math.pow(clientY - tileCenterY, 2)
            );

            const maxDistance = 120;

            if (distance < maxDistance) {
              const angle = Math.atan2(tileCenterY - clientY, tileCenterX - clientX);
              const force = (maxDistance - distance) / maxDistance;
              const moveX = Math.cos(angle) * force * 30;
              const moveY = Math.sin(angle) * force * 30;

              gsap.to(tile, {
                x: `+=${moveX}`,
                y: `+=${moveY}`,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, aboutRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="about" ref={aboutRef} className="relative w-full mx-auto py-20 px-4 ">
      {/* Large Animated Text Paragraph */}
      <div className="about-text pt-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            className="text-lg sm:text-4xl lg:text-5xl leading-relaxed text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Welcome to <span className="text-primary font-semibold">CentrAL</span>, Sri Lanka&apos;s
            premier digital learning platform
            <LayoutGroup>
              <motion.div className="flex whitespace-pre" layout>
                <motion.span
                  className="pt-0.5 sm:pt-1 md:pt-2 flex justify-center"
                  layout
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                >
                  Make it{' '}
                </motion.span>
                <TextRotate
                  texts={[
                    'easy!',
                    'interactive',
                    'exam-ready',
                    'A/L focused',
                    'accessible',
                    'personalized',
                    'Sri Lankan',
                    'bilingual',
                  ]}
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
              </motion.div>
            </LayoutGroup>
            designed specifically for Advanced Level students. We understand the unique challenges
            of the Sri Lankan education system and have crafted an experience that combines
            <span className="text-primary font-medium"> cutting-edge technology</span> with
            <span className="text-primary font-medium"> deep curriculum knowledge</span> to help you
            excel.
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Word Tiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`floating-tile absolute px-4 py-3 sm:px-5 sm:py-3 rounded-full bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/5 flex items-center justify-center shadow-sm`}
            style={{
              left: `${15 + index * 20}%`,
              top: `${25 + index * 15}%`,
            }}
          >
            <span className="text-sm sm:text-base lg:text-lg font-medium text-foreground/70">
              {feature.word}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
