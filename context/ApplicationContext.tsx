"use client";
import React, { createContext, useState, useContext } from 'react';
import { DiaryEntry } from '@prisma/client';

type DashboardState = {
  daily: boolean;
  weekly: boolean;
};

type ApplicationContextType = {
  dashboard: DashboardState;
  notes: DiaryEntry[];
  setDashboard: React.Dispatch<React.SetStateAction<DashboardState>>;
  setNotes: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

const defaultDashboardState: DashboardState = {
  daily: true,
  weekly: false,
};

const defaultContextValue: ApplicationContextType = {
  dashboard: defaultDashboardState,
  notes: [],
  setDashboard: () => {},
  setNotes: () => {},
};

const ApplicationContext = createContext<ApplicationContextType>(defaultContextValue);

export const useApplicationContext = () => useContext(ApplicationContext);

interface ApplicationContextProviderProps {
  children: React.ReactNode;
}

export const ApplicationContextProvider: React.FC<ApplicationContextProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<DiaryEntry[]>([]);
  const [dashboard, setDashboard] = useState<DashboardState>(defaultDashboardState);

  return (
    <ApplicationContext.Provider value={{ notes, setNotes, dashboard, setDashboard }}>
      {children}
    </ApplicationContext.Provider>
  );
};
