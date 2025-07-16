'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Magnet from '../Animations/Magnet';
import SplitText from './SplitText';
import WrapButton from './wrap-button';

type AvatarProps = {
  imageSrc: string;
  delay: number;
};

const Avatar: React.FC<AvatarProps> = ({ imageSrc, delay }) => {
  return (
    <div
      className="relative h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg animate-fadeIn"
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={imageSrc} alt="User avatar" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  );
};

const TrustElements: React.FC = () => {
  const avatars = [
    'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
  ];

  return (
    <div className="inline-flex items-center space-x-3 bg-gray-900/60 backdrop-blur-sm rounded-full py-2 px-3 sm:py-2 sm:px-4 text-xs sm:text-sm">
      <div className="flex -space-x-2 sm:-space-x-3">
        {avatars.map((avatar, index) => (
          <Avatar key={index} imageSrc={avatar} delay={index * 200} />
        ))}
      </div>
      <p
        className="text-white animate-fadeIn whitespace-nowrap font-space"
        style={{ animationDelay: '800ms' }}
      >
        <span className="text-white font-semibold">2.4K</span> currently on the waitlist
      </p>
    </div>
  );
};

const GradientBars: React.FC = () => {
  const [numBars] = useState(15);
  const barsRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const revertTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const originalHeightsRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize bars with random heights
      const bars = barRefs.current;
      if (bars.length > 0) {
        // Set initial random heights and store them
        bars.forEach((bar, index) => {
          if (bar) {
            const randomHeight = Math.random() * 60 + 20; // Random height between 20-80%
            originalHeightsRef.current[index] = randomHeight / 100;
            gsap.set(bar, { scaleY: randomHeight / 100 });
          }
        });

        // Function to revert bars to original heights
        const revertBars = () => {
          bars.forEach((bar, index) => {
            if (bar) {
              gsap.to(bar, {
                scaleY: originalHeightsRef.current[index],
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });
        };

        // Mouse move interaction
        const handleMouseMove = (e: MouseEvent) => {
          mouseRef.current = { x: e.clientX, y: e.clientY };

          // Clear existing timeout
          if (revertTimeoutRef.current) {
            clearTimeout(revertTimeoutRef.current);
          }

          bars.forEach((bar) => {
            if (bar) {
              const rect = bar.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;

              const distanceX = Math.abs(e.clientX - centerX);
              const distanceY = Math.abs(e.clientY - centerY);
              const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

              const maxDistance = 300;
              const influence = Math.max(0, 1 - distance / maxDistance);
              const heightBoost = influence * 0.3;

              const currentScale = gsap.getProperty(bar, 'scaleY') as number;
              const newScale = Math.min(1, currentScale + heightBoost);

              gsap.to(bar, {
                scaleY: newScale,
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          });

          // Set timeout to revert after 5 seconds
          revertTimeoutRef.current = setTimeout(revertBars, 5000);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Create scroll-triggered animation
        const scrollTrigger = ScrollTrigger.create({
          trigger: barsRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            bars.forEach((bar, index) => {
              if (bar) {
                // Create wave effect based on scroll progress
                const wave = Math.sin(progress * Math.PI * 4 + index * 0.5) * 0.3;
                const baseHeight = calculateHeight(index, numBars);
                const scrollInfluence = Math.sin(progress * Math.PI * 2) * 20;
                const finalHeight = baseHeight + wave * 30 + scrollInfluence;

                gsap.to(bar, {
                  scaleY: Math.max(0.2, Math.min(1, finalHeight / 100)),
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }
            });
          },
        });

        // Continuous floating animation
        bars.forEach((bar, index) => {
          if (bar) {
            gsap.to(bar, {
              scaleY: `+=${Math.random() * 0.2 - 0.1}`,
              duration: 2 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.1,
            });
          }
        });

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          if (revertTimeoutRef.current) {
            clearTimeout(revertTimeoutRef.current);
          }
          scrollTrigger.kill();
        };
      }
    }
  }, [numBars]);

  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const maxHeight = 80;
    const minHeight = 30;

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" ref={barsRef}>
      <div
        className="flex h-full"
        style={{
          width: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {Array.from({ length: numBars }).map((_, index) => {
          const height = calculateHeight(index, numBars);
          return (
            <div
              key={index}
              ref={(el) => {
                barRefs.current[index] = el;
              }}
              className="gradient-bar"
              style={{
                flex: '1 0 calc(100% / 15)',
                maxWidth: 'calc(100% / 15)',
                height: '100%',
                background: 'linear-gradient(to top, rgb(0, 200, 250), transparent)',
                transform: `scaleY(${height / 100})`,
                transformOrigin: 'bottom',
                outline: '1px solid rgba(0, 0, 0, 0)',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="w-full relative min-h-screen flex flex-col items-center px-6 sm:px-8 md:px-12 overflow-hidden">
  
      <GradientBars />
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen py-8 sm:py-16">
        <div className="mb-6 sm:mb-8">
          <Magnet padding={600} disabled={false} magnetStrength={40}>
            <TrustElements />
          </Magnet>
        </div>
        <h1 className="w-full text-white leading-tight tracking-tight mb-1 sm:mb-2 animate-fadeIn px-4">
          <span className="block font-inter font-medium text-[clamp(1.5rem,6vw,3.75rem)] whitespace-nowrap">
            Redefining Whats Possible,
          </span>
          <span className="block font-instrument italic text-[clamp(1.5rem,6vw,3.75rem)] whitespace-nowrap">
            One lesson at a time.
          </span>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        </h1>
        <div className="text-2xl lg:text-3xl mx-auto max-w-2xl text-center">
          <SplitText
            text="CentrAL aims to be an educational resource sharing hub."
            delay={10}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
        <div className="w-full flex justify-center relative z-20">
          <WrapButton className="mt-10" href="/auth/sign-up">
            <Globe className="animate-spin " />
            Get started
          </WrapButton>
        </div>
      </div>
    </section>
  );
};
