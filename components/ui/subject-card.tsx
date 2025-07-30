'use client';
import React from 'react';
import { Users, ArrowRight, ExternalLink } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  description: string;
  status: string;
  students: number;
  languages: string[];
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
    <div className="project-item relative p-6 rounded-xl border bg-card transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(status)}`}
            >
              {status}
            </div>
          </div>

          <p className="text-muted-foreground mb-4 text-sm">{description}</p>

          {/* Languages */}
          <div className="flex flex-wrap gap-2 mb-4">
            {languages.map((language, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
              >
                {language}
              </span>
            ))}
          </div>

          {/* Students count */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-4 lg:mt-0 lg:ml-6">
          <a
            href={links.docs}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-accent transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Contribute</span>
          </a>

          <a
            href={links.demo}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            <span className="text-sm">View</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
