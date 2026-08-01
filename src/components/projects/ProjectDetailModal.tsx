'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, CheckCircle, Calendar, MessageCircle, Route, Sun, Droplets, Trees, ShieldCheck, GlassWater, Landmark, Zap, Grid, Droplet, Building2 } from 'lucide-react';
import type { Project, Locale } from '@/types';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onBookVisit: (projectName: string) => void;
  lang: Locale;
}

const iconMap: Record<string, React.ReactNode> = {
  Route: <Route className="w-4 h-4 text-[#B38F22]" />,
  Sun: <Sun className="w-4 h-4 text-[#B38F22]" />,
  Droplets: <Droplets className="w-4 h-4 text-[#B38F22]" />,
  Trees: <Trees className="w-4 h-4 text-[#B38F22]" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-[#B38F22]" />,
  GlassWater: <GlassWater className="w-4 h-4 text-[#B38F22]" />,
  Landmark: <Landmark className="w-4 h-4 text-[#B38F22]" />,
  Zap: <Zap className="w-4 h-4 text-[#B38F22]" />,
  Grid: <Grid className="w-4 h-4 text-[#B38F22]" />,
  Droplet: <Droplet className="w-4 h-4 text-[#B38F22]" />,
  Building2: <Building2 className="w-4 h-4 text-[#B38F22]" />,
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onBookVisit,
  lang,
}) => {
  if (!isOpen || !project) return null;

  const title = project.title[lang] || project.title.en;
  const loc = project.location[lang] || project.location.en;
  const desc = project.description[lang] || project.description.en;
  const statusLabel = project.statusText[lang] || project.statusText.en;

  return (
    <div className="modal-backdrop active" id="project-detail-modal">
      <div className="modal-card max-w-[750px]">
        <div className="modal-header">
          <div>
            <span className={`badge ${project.badgeClass}`}>{statusLabel}</span>
            <h3 className="text-xl font-bold mt-1.5">{title}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>{loc}</span>
            </p>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="rounded-lg overflow-hidden h-[260px] mb-6 relative">
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <h4 className="font-bold text-lg mb-2 text-[var(--primary)]">Project Overview</h4>
          <p className="mb-5 text-sm text-[var(--text-main)] leading-relaxed">{desc}</p>

          <div className="bg-[var(--light-bg)] p-4 rounded-md mb-6 space-y-1 text-sm border border-[var(--border-color)]">
            <p><strong>Approval:</strong> {project.approval}</p>
            <p><strong>Plot Sizes:</strong> {project.plotSizes}</p>
            <p><strong>Pricing:</strong> {project.priceStarting}</p>
          </div>

          <h4 className="font-bold text-base mb-3 text-[var(--primary)]">Key Layout Amenities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {project.amenities.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] p-2.5 rounded-md text-xs"
              >
                {iconMap[a.icon] || <CheckCircle className="w-4 h-4 text-[#B38F22]" />}
                <span>{a.name}</span>
              </div>
            ))}
          </div>

          <h4 className="font-bold text-base mb-3 text-[var(--primary)]">Location Advantages</h4>
          <ul className="mb-8 space-y-2">
            {project.advantages.map((adv, i) => (
              <li key={i} className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onBookVisit(title);
              }}
            >
              <Calendar className="w-4 h-4" /> Book Free Site Visit
            </button>
            <a
              href={`https://wa.me/918681851548?text=Hi%20Kopuram%20Builders,%20I%20am%20interested%20in%20${encodeURIComponent(
                title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
