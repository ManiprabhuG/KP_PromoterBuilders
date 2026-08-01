'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" id="success-modal">
      <div className="modal-card text-center p-8 max-w-[480px]">
        <div className="w-16 h-16 bg-emerald-500/15 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{message}</p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          OK, Got It
        </button>
      </div>
    </div>
  );
};
