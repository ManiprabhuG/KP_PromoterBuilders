'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { contactFormSchema } from '@/lib/validations';
import type { ContactFormInput, Locale } from '@/types';

interface ContactFormProps {
  dict: Record<string, string>;
  lang: Locale;
  onSubmitSuccess: (title: string, message: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  dict,
  lang,
  onSubmitSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      project: 'Kopuram Nagar Phase 2',
    },
  });

  const onFormSubmit = (data: ContactFormInput) => {
    reset();
    onSubmitSuccess(
      lang === 'ta' ? 'நன்றி! உங்கள் செய்தி பெறப்பட்டது.' : 'Thank You! Message Received.',
      lang === 'ta'
        ? 'எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்புகொள்வார்கள்.'
        : 'Our project specialist will get in touch with you shortly.'
    );
  };

  return (
    <div className="bg-[var(--card-bg)] p-8 rounded-xl border border-[var(--border-color)] shadow-md">
      <h3 className="text-xl font-bold mb-5 text-[var(--primary)]">Send Direct Inquiry</h3>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="form-group">
          <label className="form-label">{dict.form_name} *</label>
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
          <label className="form-label">{dict.form_phone} *</label>
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
          <label className="form-label">{dict.form_email} *</label>
          <input
            type="email"
            className="form-control"
            placeholder="john@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">{dict.form_project}</label>
          <select className="form-control" {...register('project')}>
            <option value="Kopuram Nagar Phase 2">Kopuram Nagar Phase 2 (Ring Road)</option>
            <option value="Kopuram Sangatamil Nagar Phase III">
              Kopuram Sangatamil Nagar Phase III (Panaikulam)
            </option>
            <option value="Kopuram Diamond City">Kopuram Diamond City (Narasingam)</option>
          </select>
          {errors.project && (
            <p className="text-red-500 text-xs mt-1">{errors.project.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">{dict.form_message} *</label>
          <textarea
            className="form-control h-28"
            placeholder="Please provide plot details and pricing schedule..."
            {...register('message')}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          <Send className="w-4 h-4" />
          <span>{dict.form_submit}</span>
        </button>
      </form>
    </div>
  );
};
