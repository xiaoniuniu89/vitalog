import { DiaryEntry as Notes } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  startOfWeek,
  differenceInCalendarDays,
} from "date-fns";
import { type CarouselApi } from "@/components/ui/carousel";

export default function useEntryCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const dayIndex = differenceInCalendarDays(today, weekStart);

  useEffect(() => {
    async function fetchDiaries() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/notes`);
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
  }, []);

  return {
    api,
    setApi,
    notes,
    setNotes,
    isLoading,
    dayIndex,
    weekStart,
    today,
  };
}
