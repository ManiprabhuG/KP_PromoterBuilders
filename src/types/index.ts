export type Locale = 'en' | 'ta';

export interface LocalizedString {
  en: string;
  ta: string;
}

export interface ProjectAmenity {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: LocalizedString;
  location: LocalizedString;
  status: 'available' | 'ongoing' | 'soldout';
  statusText: LocalizedString;
  badgeClass: string;
  image: string;
  approval: string;
  dtcpNo: string;
  plotSizes: string;
  priceStarting: string;
  description: LocalizedString;
  amenities: ProjectAmenity[];
  advantages: string[];
  gallery: string[];
}

export interface BookingFormInput {
  name: string;
  phone: string;
  project: string;
  date: string;
  time: string;
}

export interface ContactFormInput {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
}

export interface LeadPopupInput {
  name: string;
  phone: string;
}
