'use client';
import React from 'react';
import { Users, ArrowRight, ExternalLink, BookOpen, Globe } from 'lucide-react';
import Image from 'next/image';

interface SubjectCardProps {
  title: string;
  description: string;
  status: string;
  students: number;
  languages: string[];
  image: string;
  links: {
    github: string;
    docs: string;
    demo: string;
  };
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  description,
  status,
  students,
  languages,
  image,
  links,
}) => {
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
    <div className="project-item group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-card/50 to-card backdrop-blur-sm transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8">
        {/* Header with image and title */}
        <div className="flex items-start gap-6 mb-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-1 group-hover:scale-110 transition-transform duration-300">
            <div className="w-full h-full rounded-xl overflow-hidden">
              <Image
                src={image}
                alt={`${title} icon`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-foreground">{title}</h3>
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getStatusColor(status)} shadow-sm`}
              >
                {status}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        {/* Topics/Languages */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Topics Covered
          </h4>
          <div className="flex flex-wrap gap-2">
            {languages.map((language, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground text-sm rounded-lg font-medium border border-primary/20 hover:border-primary/40 transition-colors duration-200"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Language Availability */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Available Languages
          </h4>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground text-sm rounded-lg font-medium border border-primary/20 hover:border-primary/40 transition-colors duration-200">
              English
            </span>
            <span className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground text-sm rounded-lg font-medium border border-primary/20 hover:border-primary/40 transition-colors duration-200">
              සිංහල
            </span>
            <span className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground text-sm rounded-lg font-medium border border-primary/20 hover:border-primary/40 transition-colors duration-200">
              தமிழ்
            </span>
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="font-semibold">{students}</span>
            <span className="text-sm">students enrolled</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={links.docs}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group/btn"
            >
              <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Contribute</span>
            </a>

            <a
              href={links.demo}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground transition-all duration-200 group/btn"
            >
              <span className="text-sm font-semibold">Study Now</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
