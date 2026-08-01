'use client';

import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileCallBar } from './MobileCallBar';
import { FloatingButtons } from './FloatingButtons';
import { BookingModal } from '../modals/BookingModal';
import { LeadPopupModal } from '../modals/LeadPopupModal';
import { SuccessModal } from '../modals/SuccessModal';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { AppShellProvider } from '@/context/AppShellContext';
import type { Locale, Project } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
  lang: Locale;
  dict: Record<string, string>;
}

export const AppShell: React.FC<AppShellProps> = ({ children, lang, dict }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingProject, setSelectedBookingProject] = useState<string>('Kopuram Nagar Phase 2');

  const [detailModalProject, setDetailModalProject] = useState<Project | null>(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalData, setSuccessModalData] = useState({ title: '', message: '' });

  const handleOpenBookingModal = (projectName?: string) => {
    if (projectName) {
      setSelectedBookingProject(projectName);
    }
    setBookingModalOpen(true);
  };

  const handleOpenDetailModal = (project: Project) => {
    setDetailModalProject(project);
  };

  const handleShowSuccess = (title: string, message: string) => {
    setSuccessModalData({ title, message });
    setSuccessModalOpen(true);
  };

  return (
    <AppShellProvider
      value={{
        onOpenBookingModal: handleOpenBookingModal,
        onOpenDetailModal: handleOpenDetailModal,
        onShowSuccess: handleShowSuccess,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <TopBar dict={dict} />
        <Navbar
          lang={lang}
          dict={dict}
          onOpenBookingModal={handleOpenBookingModal}
        />

        <main className="flex-grow">{children}</main>

        <Footer lang={lang} dict={dict} />
        <MobileCallBar onOpenBookingModal={() => handleOpenBookingModal()} />
        <FloatingButtons />

        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          onSubmitSuccess={handleShowSuccess}
          defaultProject={selectedBookingProject}
          lang={lang}
        />

        <LeadPopupModal onSubmitSuccess={handleShowSuccess} />

        <ProjectDetailModal
          project={detailModalProject}
          isOpen={!!detailModalProject}
          onClose={() => setDetailModalProject(null)}
          onBookVisit={handleOpenBookingModal}
          lang={lang}
        />

        <SuccessModal
          isOpen={successModalOpen}
          title={successModalData.title}
          message={successModalData.message}
          onClose={() => setSuccessModalOpen(false)}
        />
      </div>
    </AppShellProvider>
  );
};
