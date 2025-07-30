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
      color: 'grey-300/30 to-grey-300/20',
    },
    {
      word: 'Connect',
      color: 'grey-300/30 to-grey-300/20',
    },
    {
      word: 'Practice',
      color: 'grey-300/30 to-grey-300/20',
    },
    {
      word: 'Excel',
      color: 'grey-300/30 to-grey-300/20',
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
              start: 'top 75%',
              end: 'top 50%',
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
    <section id="about" ref={aboutRef} className="relative w-full mx-auto pt-10 pb-20 px-4 ">
      {/* Large Animated Text Paragraph */}
      <div className="about-text pt-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto text-center px-4 max-w-[80vw]"
        >
          <motion.div
            className="text-2xl sm:text-5xl lg:text-6xl leading-relaxed sm:leading-tight lg:leading-tight text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold">centrAL</span> is a student-powered
            learning platform revolutionizing A/L education in Sri Lanka. By crowdsourcing{' '}
            <LayoutGroup>
              <motion.div className="inline-flex items-center whitespace-nowrap" layout>
                <motion.span
                  className="inline-block"
                  layout
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                >
                  high-quality{' '}
                </motion.span>
                <TextRotate
                  texts={['study notes', 'past papers', 'revision tools']}
                  mainClassName="text-white px-1.5 sm:px-2 md:px-3 bg-[#43afbe] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-block whitespace-nowrap"
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
            </LayoutGroup>{' '}
            centrAL makes top-tier resources accessible to{' '}
            <span className="text-primary font-semibold">everyone</span>. It’s more than a
            repository; it’s a movement for equitable, collaborative learning.
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Word Tiles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`floating-tile absolute px-4 py-3 sm:px-5 sm:py-3 rounded-full bg-gradient-to-br ${feature.color} backdrop-blur-lg border border-white/20 flex items-center justify-center shadow-sm`}
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
