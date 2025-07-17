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
      name: 'Alex Chen',
      role: 'Lead Developer',
      avatar:
        'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Full-stack developer with 8+ years of experience in React and Node.js.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        website: '#',
      },
    },
    {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Creative designer passionate about creating beautiful and functional interfaces.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        website: '#',
      },
    },
    {
      name: 'Mike Rodriguez',
      role: 'DevOps Engineer',
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Infrastructure specialist focused on scalable and reliable deployment solutions.',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Architecture'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        website: '#',
      },
    },
    {
      name: 'Emma Thompson',
      role: 'Community Manager',
      avatar:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
      bio: 'Building and nurturing our developer community with engaging content and events.',
      skills: ['Community Building', 'Content Strategy', 'Event Planning', 'Marketing'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
        website: '#',
      },
    },
  ];

  return (
    <section
      id="contributors"
      ref={contributorsRef}
      className="w-full max-w-7xl mx-auto px-4 py-20"
    >
      <div className="text-center mb-16">
        <div className="contributors-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Meet the Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The passionate individuals behind centrAL, working to create the best developer
            experience
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

                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
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
