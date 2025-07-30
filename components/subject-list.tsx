'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubjectCard from './ui/subject-card';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SubjectList: React.FC = () => {
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && listRef.current) {
      const ctx = gsap.context(() => {
        // Animate subject cards with stagger effect
        gsap.fromTo(
          '.project-item',
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate header content
        gsap.fromTo(
          '.list-header > *',
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Add floating animation to subject icons
        gsap.to('.project-item img', {
          y: -10,
          duration: 2,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
        });
      }, listRef);

      return () => ctx.revert();
    }
  }, []);

  const projects = [
    {
      title: 'Mathematics',
      description:
        'Master the fundamental language of science through calculus, algebra, geometry, and statistics. Build problem-solving skills that form the foundation of all STEM fields.',
      status: 'Active',
      students: 15,
      languages: ['Calculus', 'Algebra', 'Geometry', 'Statistics'],
      image: '/images/subjects/mathematics.svg',
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
    {
      title: 'Physics',
      description:
        'Explore the fundamental laws that govern our universe, from quantum mechanics to thermodynamics. Develop analytical thinking through hands-on experiments.',
      status: 'Beta',
      students: 8,
      languages: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum'],
      image: '/images/subjects/physics.svg',
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
    {
      title: 'Chemistry',
      description:
        'Discover the molecular world through organic, inorganic, and physical chemistry. Learn how atoms and molecules interact to create everything around us.',
      status: 'Development',
      students: 5,
      languages: ['Organic', 'Inorganic', 'Physical', 'Analytical'],
      image: '/images/subjects/chemistry.svg',
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
    {
      title: 'Biology',
      description:
        'Study life in all its forms, from molecular biology to ecology. Understand evolution, genetics, and the interconnected web of living systems.',
      status: 'Planning',
      students: 3,
      languages: ['Molecular', 'Ecology', 'Evolution', 'Genetics'],
      image: '/images/subjects/biology.svg',
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
  ];

  return (
    <section id="subjects" ref={listRef} className="w-full max-w-full mx-auto px-10 md:px-60 py-10">
      <div className="mb-16">
        <div className="feature-header">
          <h2 className="text-7xl md:text-9xl font-serif my-6 pb-1 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-center">
            <p className="inline italic">Subjects </p> offered
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-center">Placeholder</p>
        </div>
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <SubjectCard
            key={index}
            title={project.title}
            description={project.description}
            status={project.status}
            students={project.students}
            languages={project.languages}
            image={project.image}
            links={project.links}
          />
        ))}
      </div>
    </section>
  );
};

export default SubjectList;
