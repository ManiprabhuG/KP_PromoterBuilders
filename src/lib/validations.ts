import { z } from 'zod';

export const bookingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  project: z.string().min(1, 'Please select a layout project'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email address'),
  project: z.string().min(1, 'Please select a project'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export const leadPopupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
});
