'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Download } from 'lucide-react';
import { leadPopupSchema } from '@/lib/validations';
import type { LeadPopupInput } from '@/types';

interface LeadPopupModalProps {
  onSubmitSuccess: (title: string, message: string) => void;
}

export const LeadPopupModal: React.FC<LeadPopupModalProps> = ({ onSubmitSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadPopupInput>({
    resolver: zodResolver(leadPopupSchema),
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('kp_lead_dismissed')) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('kp_lead_dismissed', 'true');
    setIsOpen(false);
  };

  const onFormSubmit = (data: LeadPopupInput) => {
    handleDismiss();
    reset();
    onSubmitSuccess(
      'Brochure Requested!',
      'Our team will send the layout map and brochure directly to your WhatsApp number.'
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" id="lead-popup-modal">
      <div className="modal-card max-w-[520px] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] p-8 color-white text-white relative">
          <button
            type="button"
            className="modal-close text-white absolute top-4 right-4"
            onClick={handleDismiss}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <span className="badge badge-gold mb-3">Special Offer</span>
          <h3 className="text-white text-2xl font-bold mb-2">Get Free Site Visit & Brochure</h3>
          <p className="text-sm opacity-90">
            Book a zero-cost AC cab site visit with your family to Kopuram layout projects in Madurai.
          </p>
        </div>

        <div className="modal-body p-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter WhatsApp number"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-secondary w-full text-base py-3">
              <Download className="w-4 h-4" />
              <span>Get Instant Callback & Brochure</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
