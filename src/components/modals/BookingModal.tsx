'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Calendar, CheckCircle } from 'lucide-react';
import { bookingFormSchema } from '@/lib/validations';
import type { BookingFormInput, Locale } from '@/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (title: string, message: string) => void;
  defaultProject?: string;
  lang: Locale;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  defaultProject = 'Kopuram Nagar Phase 2',
  lang,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      project: defaultProject,
      time: '10:00 AM',
    },
  });

  if (!isOpen) return null;

  const onFormSubmit = async (data: BookingFormInput) => {
    // Process booking
    reset();
    onClose();
    onSubmitSuccess(
      lang === 'ta' ? 'மனை பார்வை முன்பதிவு செய்யப்பட்டது!' : 'Site Visit Booked Successfully!',
      lang === 'ta'
        ? 'உங்களின் இலவச வாகன வசதிக்காக எங்கள் நிர்வாகி உங்களை தொடர்புகொள்வார்.'
        : 'Our relationship manager will contact you to confirm free pickup cab details.'
    );
  };

  const isTa = lang === 'ta';

  return (
    <div className="modal-backdrop active" id="booking-modal">
      <div className="modal-card">
        <div className="modal-header">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--primary)]">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <span>{isTa ? 'இலவச மனை பார்வை முன்பதிவு' : 'Book Free Site Visit'}</span>
          </h3>
          <button type="button" className="modal-close" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div className="form-group">
              <label className="form-label">
                {isTa ? 'உங்கள் பெயர்' : 'Full Name'} *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                {isTa ? 'தொலைபேசி எண்' : 'Phone Number'} *
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="+91 98765 43210"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                {isTa ? 'விருப்பமான மனைப் பிரிவு' : 'Selected Project'}
              </label>
              <select className="form-control" {...register('project')}>
                <option value="Kopuram Nagar Phase 2">Kopuram Nagar Phase 2</option>
                <option value="Kopuram Sangatamil Nagar Phase III">
                  Kopuram Sangatamil Nagar Phase III
                </option>
                <option value="Kopuram Diamond City">Kopuram Diamond City</option>
              </select>
              {errors.project && (
                <p className="text-red-500 text-xs mt-1">{errors.project.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">
                  {isTa ? 'விருப்பமான தேதி' : 'Preferred Date'} *
                </label>
                <input type="date" className="form-control" {...register('date')} />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  {isTa ? 'விருப்பமான நேரம்' : 'Preferred Time'} *
                </label>
                <select className="form-control" {...register('time')}>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isTa ? 'முன்பதிவை உறுதிசெய்' : 'Confirm Site Visit'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
