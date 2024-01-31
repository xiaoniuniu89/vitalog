"use client";
import React, { createContext, useState, useContext } from "react";
import { DiaryEntry, WeeklySummary } from "@prisma/client";

type DashboardState = {
  daily: boolean;
  weekly: boolean;
};

type ApplicationContextType = {
  dashboard: DashboardState;
  notes: DiaryEntry[];
  weeklySummaries: WeeklySummary[];
  setDashboard: React.Dispatch<React.SetStateAction<DashboardState>>;
  setNotes: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setWeeklySummaries: React.Dispatch<React.SetStateAction<WeeklySummary[]>>;
};

const defaultDashboardState: DashboardState = {
  daily: true,
  weekly: false,
};

const defaultContextValue: ApplicationContextType = {
  dashboard: defaultDashboardState,
  notes: [],
  weeklySummaries: [],
  setDashboard: () => {},
  setNotes: () => {},
  setWeeklySummaries: () => {},
};

const ApplicationContext =
  createContext<ApplicationContextType>(defaultContextValue);

export const useApplicationContext = () => useContext(ApplicationContext);

interface ApplicationContextProviderProps {
  children: React.ReactNode;
}

export const ApplicationContextProvider: React.FC<
  ApplicationContextProviderProps
> = ({ children }) => {
  const [notes, setNotes] = useState<DiaryEntry[]>([]);
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>([]);
  const [dashboard, setDashboard] = useState<DashboardState>(
    defaultDashboardState,
  );

  return (
    <ApplicationContext.Provider
      value={{
        notes,
        setNotes,
        weeklySummaries,
        setWeeklySummaries,
        dashboard,
        setDashboard,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
