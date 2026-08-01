import React from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle, Award, Calendar } from 'lucide-react';
import type { Project, Locale } from '@/types';

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  onViewDetails: (project: Project) => void;
  onBookVisit: (projectName: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  lang,
  onViewDetails,
  onBookVisit,
}) => {
  const title = project.title[lang] || project.title.en;
  const loc = project.location[lang] || project.location.en;
  const desc = project.description[lang] || project.description.en;
  const statusLabel = project.statusText[lang] || project.statusText.en;

  const btnDetails = lang === 'ta' ? 'விவரங்கள் அறிய' : 'View Details';
  const btnVisit = lang === 'ta' ? 'மனை பார்வை' : 'Book Visit';

  return (
    <div className="project-card">
      <div className="project-img-wrapper">
        <span className={`badge ${project.badgeClass} project-badge-top`}>
          {statusLabel}
        </span>
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="project-body">
        <div className="project-location">
          <MapPin className="w-3.5 h-3.5" />
          <span>{loc}</span>
        </div>
        <h3 className="project-name">{title}</h3>
        <p className="project-desc">
          {desc.length > 110 ? `${desc.substring(0, 110)}...` : desc}
        </p>

        <div className="project-features-list">
          <span className="project-feature-tag">
            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{project.plotSizes}</span>
          </span>
          <span className="project-feature-tag">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{project.dtcpNo}</span>
          </span>
        </div>

        <div className="project-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onViewDetails(project)}
          >
            {btnDetails}
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onBookVisit(title)}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{btnVisit}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
