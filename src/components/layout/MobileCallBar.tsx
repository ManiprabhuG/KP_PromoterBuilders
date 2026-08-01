'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface MobileCallBarProps {
  onOpenBookingModal: () => void;
}

export const MobileCallBar: React.FC<MobileCallBarProps> = ({ onOpenBookingModal }) => {
  return (
    <div className="mobile-call-bar">
      <a href="tel:+918681851548" className="btn btn-primary btn-sm flex-1">
        <Phone className="w-4 h-4" /> Call Now
      </a>
      <button
        type="button"
        className="btn btn-secondary btn-sm flex-1"
        onClick={onOpenBookingModal}
      >
        <Calendar className="w-4 h-4" /> Book Visit
      </button>
    </div>
  );
};
