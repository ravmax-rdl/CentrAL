'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contributors: React.FC = () => {
  const contributorsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && contributorsRef.current) {
      const ctx = gsap.context(() => {
        // Create scroll animations - content is visible by default
        gsap.fromTo(
          '.contributor-card',
          { scale: 0.8, opacity: 0, rotation: 5 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: contributorsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.contributors-header',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: contributorsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, contributorsRef);

      return () => ctx.revert();
    }
  }, []);

  const contributors = [
    {
      name: 'Ravindu Liyanage',
      role: 'Lead Developer',
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      bio: 'Peace ✌️',
      skills: ['No skills'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        website: '#',
      },
    },
  ];

  return (
      <section id="contributors" ref={contributorsRef} className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="mb-16">
        <div className="feature-header">
          <h2 className="text-7xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-left">
            Meet <p className="inline italic">the team</p>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-left">
          The passionate individuals behind centrAL, working to create the best developer
          experience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contributors.map((contributor, index) => (
          <div
            key={index}
            className="contributor-card relative p-6 rounded-2xl border bg-card transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10 text-center">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={contributor.avatar}
                    alt={contributor.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>

              <h3 className="text-xl font-semibold mb-2">{contributor.name}</h3>

              <p className="text-primary/80 font-medium mb-3">{contributor.role}</p>

              <p className="text-muted-foreground text-sm mb-4">{contributor.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {contributor.skills.slice(0, 3).map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex justify-center space-x-3">
                <a
                  href={contributor.social.github}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={contributor.social.linkedin}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={contributor.social.twitter}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={contributor.social.website}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contributors;
