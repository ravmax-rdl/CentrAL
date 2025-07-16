'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  MessageSquare,
  Users,
  Zap,
  Github,
  MessageCircle,
  Twitter,
} from 'lucide-react';
import FlipLink from './text-effect-flipper';

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

  const communityLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub',
      description: 'Contribute to our open-source projects',
      link: '#',
      color: 'from-gray-600 to-gray-800',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Discord',
      description: 'Join our developer community',
      link: '#',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      title: 'Twitter',
      description: 'Follow for updates and news',
      link: '#',
      color: 'from-blue-400 to-blue-600',
    },
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '10K+',
      label: 'Active Developers',
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
    <section id="cta" ref={ctaRef} className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Main CTA */}
      <div className="text-center mb-20">
        <div className="cta-content">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Ready to Join CentrAL?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Join thousands of developers already using CentrAL to build, collaborate, and grow their
            careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-3">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Join Forum
            </button>
          </div>
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

      {/* Community Links */}
      <div className="cta-cards grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityLinks.map((link, index) => (
          <a
            key={index}
            href={link.link}
            className="cta-card relative p-8 rounded-2xl border bg-card transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-lg`}
              >
                {link.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">{link.title}</h3>

              <p className="text-muted-foreground">{link.description}</p>

              <div className="mt-4 flex items-center justify-center text-primary">
                <span className="text-sm font-medium mr-2">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>
        ))}
      </div>
      <FlipLink href="https://x.com/guri_who">Behance</FlipLink>
      <FlipLink href="https://x.com/guri_who">Behance</FlipLink>
      <FlipLink href="https://x.com/guri_who">Behance</FlipLink>
    </section>
  );
};

export default CTA;
