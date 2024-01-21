"use client";
import React, { createContext, useState, useContext } from 'react';
import { DiaryEntry } from '@prisma/client';

const ApplicationContext = createContext({});

export type Entries = DiaryEntry[];

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Entries>([]);
  console.log(notes)

  // Methods to update entries and analyses
  const updateEntries = (newEntries: Entries) => {
    setNotes(newEntries);
  };

  return (
    <ApplicationContext.Provider value={{ notes, setNotes }}>
      {children}
    </ApplicationContext.Provider>
  );
};