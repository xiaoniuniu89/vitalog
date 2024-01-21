import { DiaryEntry as Notes } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  startOfWeek,
  differenceInCalendarDays,
} from "date-fns";
import { type CarouselApi } from "@/components/ui/carousel";
import { DiaryEntry } from "@prisma/client";
import { useApplicationContext } from "@/context/ApplicationContext";

export default function useEntryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  // @ts-ignore 
  const {notes, setNotes} = useApplicationContext();
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const dayIndex = differenceInCalendarDays(today, weekStart);

  useEffect(() => {
    async function fetchDiaries() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/entry`);
        if (!response.ok) {
          console.error("Response error:", response);
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const { data } = await response.json();
        setNotes(data.notes || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setNotes([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDiaries();
  }, [setNotes]);

  const generateNoteAnalysis = async (note: DiaryEntry) => {
    try {
      const response = await fetch(`/api/entry`, {
        method: "PATCH",
        body: JSON.stringify({ note }),
      });
      if (!response.ok) {
        console.error("Response error:", response);
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const { data } = await response.json();
      setNotes((prevNotes: DiaryEntry[]) => {
        const existingNoteIndex = prevNotes.findIndex(n => n.id === data.id);
        
        if (existingNoteIndex !== -1) {
          return prevNotes.map((note, index) => 
            index === existingNoteIndex ? data : note
          );
        } else {
          return [...prevNotes, data];
        }
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSave = async (newEntry: {data: DiaryEntry}) => {
    setNotes((prevNotes: DiaryEntry[]) => [...prevNotes, newEntry.data]);
    await generateNoteAnalysis(newEntry.data);
  };

  return {
    api,
    setApi,
    notes,
    handleSave,
    isLoading,
    dayIndex,
    weekStart,
    today,
  };
}
