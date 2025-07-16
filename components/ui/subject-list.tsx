'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Users, Download, ArrowRight, Github, ExternalLink } from 'lucide-react';
import MaskedDiv from './masked-div';
import Image from 'next/image';

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
      title: 'CentrAL API',
      description:
        'RESTful API for seamless integration with your existing development tools and workflows.',
      status: 'Active',
      stats: {
        stars: 1200,
        downloads: '50K+',
        contributors: 15,
      },
      tags: ['API', 'REST', 'Node.js', 'TypeScript'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
      progress: 95,
    },
    {
      title: 'CentrAL CLI',
      description:
        'Command-line interface for managing projects, deployments, and community interactions.',
      status: 'Beta',
      stats: {
        stars: 800,
        downloads: '25K+',
        contributors: 8,
      },
      tags: ['CLI', 'Tools', 'Node.js', 'Commander'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
      progress: 80,
    },
    {
      title: 'CentrAL Mobile',
      description:
        'Native mobile application for iOS and Android with real-time notifications and chat.',
      status: 'Development',
      stats: {
        stars: 300,
        downloads: '5K+',
        contributors: 5,
      },
      tags: ['Mobile', 'React Native', 'iOS', 'Android'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
      progress: 45,
    },
    {
      title: 'CentrAL Extensions',
      description: 'Browser extensions and VS Code plugins for enhanced development productivity.',
      status: 'Planning',
      stats: {
        stars: 150,
        downloads: '2K+',
        contributors: 3,
      },
      tags: ['Extensions', 'Browser', 'VS Code', 'Productivity'],
      links: {
        github: '#',
        docs: '#',
        demo: '#',
      },
      progress: 20,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Beta':
        return 'bg-blue-500';
      case 'Development':
        return 'bg-yellow-500';
      case 'Planning':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section id="projects" ref={listRef} className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="list-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Subjects offered
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our open-source projects and tools that power the CentrAL ecosystem
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-item relative p-8 rounded-2xl border bg-card transition-all duration-500"
          >
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>

                  {/* Status badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </div>

                  {/* Progress bar */}
                  <div className="hidden lg:flex items-center gap-2 ml-auto">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stats.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{project.stats.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.stats.contributors}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-6 lg:mt-0 lg:ml-6">
                <a
                  href={project.links.github}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Code</span>
                </a>

                <a
                  href={project.links.docs}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Docs</span>
                </a>

                <a
                  href={project.links.demo}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  <span className="text-sm">Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MaskedDiv maskType="type-1" size={0.45} className="my-4">
        <video autoPlay loop muted>
          <source
            src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
      </MaskedDiv>

      <MaskedDiv maskType="type-4" size={0.45} className="my-4">
        <Image width={1920} height={1080} src="/images/logowhite.png" alt="" />
      </MaskedDiv>
    </section>
  );
};

export default SubjectList;
