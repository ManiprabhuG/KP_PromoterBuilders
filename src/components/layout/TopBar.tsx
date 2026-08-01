import React from 'react';
import { MapPin, Phone, Clock, Star, Instagram } from 'lucide-react';

interface TopBarProps {
  dict: Record<string, string>;
}

export const TopBar: React.FC<TopBarProps> = ({ dict }) => {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <div className="top-bar-info">
          <span>
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{dict.top_location}</span>
          </span>
          <span>
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <a href="tel:+918681851548" className="hover:underline">
              {dict.top_phone}
            </a>
          </span>
          <span className="hidden md:flex">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{dict.top_hours}</span>
          </span>
        </div>
        <div className="top-bar-ratings">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>{dict.top_ratings}</span>
          </span>
          <a
            href="https://www.instagram.com/kopuram_promoter_builders_llp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E1306C] hover:opacity-80 transition-opacity ml-2"
            title="Follow Kopuram Builders on Instagram"
          >
            <Instagram className="w-4 h-4 inline" />
          </a>
        </div>
      </div>
    </div>
  );
};
