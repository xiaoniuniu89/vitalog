"use client";
import { useState, useEffect } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";

export default function useWeeklySummaries() {
const {weeklySummaries, setWeeklySummaries} = useApplicationContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWeeklySummaries() {
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

    fetchWeeklySummaries();
  }, [setWeeklySummaries]);


  return {
    isLoading,
    weeklySummaries
  };
}
