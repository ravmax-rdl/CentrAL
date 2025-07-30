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
        // Create scroll animations - content is visible by default
        gsap.fromTo(
          '.project-item',
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          '.list-header',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, listRef);

      return () => ctx.revert();
    }
  }, []);

  const projects = [
    {
      title: 'Mathematics',
      description:
        'RESTful API for seamless integration with your existing development tools and workflows.',
      status: 'Active',
      students: 15,
      languages: ['Calculus', 'Algebra', 'Geometry', 'Statistics'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
    {
      title: 'Physics',
      description:
        'Command-line interface for managing projects, deployments, and community interactions.',
      status: 'Beta',
      students: 8,
      languages: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
    {
      title: 'Chemistry',
      description:
        'Native mobile application for iOS and Android with real-time notifications and chat.',
      status: 'Development',
      students: 5,
      languages: ['Organic', 'Inorganic', 'Physical', 'Analytical'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
    {
      title: 'Biology',
      description: 'Browser extensions and VS Code plugins for enhanced development productivity.',
      status: 'Planning',
      students: 3,
      languages: ['Molecular', 'Ecology', 'Evolution', 'Genetics'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
    },
  ];

  return (
    <section id="subjects" ref={listRef} className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="mb-16">
        <div className="feature-header">
          <h2 className="text-7xl md:text-8xl font-serif mb-6 pb-1 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-center">
            <p className="inline italic">Subjects </p> offered
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-center">Placeholder</p>
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <SubjectCard
            key={index}
            title={project.title}
            description={project.description}
            status={project.status}
            students={project.students}
            languages={project.languages}
            links={project.links}
          />
        ))}
      </div>
    </section>
  );
};

export default SubjectList;
