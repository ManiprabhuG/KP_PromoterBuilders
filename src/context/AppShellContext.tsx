'use client';

import React, { createContext, useContext } from 'react';
import type { Project } from '@/types';

interface AppShellContextType {
  onOpenBookingModal: (projectName?: string) => void;
  onOpenDetailModal: (project: Project) => void;
  onShowSuccess: (title: string, message: string) => void;
}

const AppShellContext = createContext<AppShellContextType>({
  onOpenBookingModal: () => {},
  onOpenDetailModal: () => {},
  onShowSuccess: () => {},
});

export const AppShellProvider: React.FC<{
  value: AppShellContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
};

export const useAppShell = () => useContext(AppShellContext);
