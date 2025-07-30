'use client';

import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate main sections
      tl.fromTo(
        [brandRef.current, connectRef.current, socialRef.current],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      // Animate back to top button
      tl.fromTo(
        backToTopRef.current,
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );

      // Animate links within sections
      tl.fromTo(
        '.footer-link',
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Animate footer bottom
      tl.fromTo(
        bottomRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Add hover animations for links
      gsap.utils.toArray('.footer-link').forEach((link) => {
        const linkElement = link as HTMLElement;

        linkElement.addEventListener('mouseenter', () => {
          gsap.to(linkElement, {
            y: -2,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        linkElement.addEventListener('mouseleave', () => {
          gsap.to(linkElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Add hover animation for back to top button
      const backToTopElement = backToTopRef.current;
      if (backToTopElement) {
        backToTopElement.addEventListener('mouseenter', () => {
          gsap.to(backToTopElement, {
            scale: 1.1,
            rotation: 360,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        backToTopElement.addEventListener('mouseleave', () => {
          gsap.to(backToTopElement, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-gradient-to-b from-background to-muted/20 -mt-16 z-30"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      {/* Back to top button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="absolute -top-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center backdrop-blur-sm"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto px-6 py-16 ">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 ">
          {/* Brand Section */}
          <div ref={brandRef} className="md:col-span-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
                  centrAL
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  Your central hub for academic excellence. Discover subjects, connect with peers,
                  and unlock your potential in the digital age.
                </p>
              </div>

              <ThemeSwitcher />
            </div>
          </div>

          {/* Connect Section */}
          <div ref={connectRef} className="md:col-span-3">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Connect</h4>
            <nav className="space-y-3">
              <a
                href="#contributors"
                className="footer-link group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Our Team
              </a>
              <a
                href="/auth/login"
                className="footer-link group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Login
              </a>
              <a
                href="/auth/sign-up"
                className="footer-link group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Sign Up
              </a>
              <a
                href="mailto:contact@central.app"
                className="footer-link group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social Media Section */}
          <div ref={socialRef} className="md:col-span-3">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Follow Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <a
                  href="https://github.com/ravmax-rdl"
                  className="footer-link group w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github
                    size={18}
                    className="text-muted-foreground group-hover:text-primary-foreground transition-colors"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/ravmax-rdl"
                  className="footer-link group w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin
                    size={18}
                    className="text-muted-foreground group-hover:text-primary-foreground transition-colors"
                  />
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Join our community of learners and stay updated with the latest features.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          ref={bottomRef}
          className="pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 <span className="font-semibold text-foreground">centrAL</span>. All rights
              reserved.
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="/privacy"
              className="footer-link text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              Privacy
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="/terms"
              className="footer-link text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              Terms
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="/cookies"
              className="footer-link text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              Cookies
              <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
