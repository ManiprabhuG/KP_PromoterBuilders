'use client';

import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '@/data/projects';
import type { Project, Locale } from '@/types';

interface ProjectsFilterGridProps {
  lang: Locale;
  dict: Record<string, string>;
  onViewDetails: (project: Project) => void;
  onBookVisit: (projectName: string) => void;
}

export const ProjectsFilterGrid: React.FC<ProjectsFilterGridProps> = ({
  lang,
  dict,
  onViewDetails,
  onBookVisit,
}) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'ongoing'>('all');

  const filteredProjects = projectsData.filter((proj) => {
    if (filter === 'all') return true;
    return proj.status === filter;
  });

  return (
    <div>
      <div className="filter-bar">
        <button
          type="button"
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {dict.filter_all}
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
          onClick={() => setFilter('available')}
        >
          {dict.filter_available}
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === 'ongoing' ? 'active' : ''}`}
          onClick={() => setFilter('ongoing')}
        >
          {dict.filter_ongoing}
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No layout projects found under this filter.
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onViewDetails={onViewDetails}
              onBookVisit={onBookVisit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
