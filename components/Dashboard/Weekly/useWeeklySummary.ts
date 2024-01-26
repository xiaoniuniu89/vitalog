"use client";
import { WeeklySummary as Summaries } from "@prisma/client";
import { useState, useEffect } from "react";

export default function useWeeklySummaries() {
const [weeklySummaries, setWeeklySummaries] = useState<Summaries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDiaries() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/summary/weekly`);
        if (!response.ok) {
          console.error("Response error:", response);
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const { data } = await response.json();
        setWeeklySummaries(data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setWeeklySummaries([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDiaries();
  }, [setWeeklySummaries]);


  return {
    isLoading,
    weeklySummaries
  };
}
