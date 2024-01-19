"use client";
import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, differenceInCalendarDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import AddEntry from "../AddEntry/AddEntry";
import { DiaryEntry as Notes } from "@prisma/client";

function EntryCarousel() {
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
            console.error('Response error:', response);
            throw new Error(`HTTP Error: ${response.status}`);
          }
          const {data} = await response.json();
          setNotes(data.notes || []);
        } catch (error) {
          console.error('Fetch error:', error);
          setNotes([]);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchDiaries();
    }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-full flex justify-center align-middle entryCarousel ">
      <div className="flex flex-col justify-center">
        <Carousel opts={{ startIndex: dayIndex }} setApi={setApi} className="w-full max-w-3xl">
          <CarouselContent>
            {Array.from({ length: 7 }).map((_, index) => {
              const day = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), index);
              const formattedDay = format(day, "yyyy-MM-dd");
              const isPastOrToday = differenceInCalendarDays(day, today) <= 0;
              const formattedDayOfWeek = format(day, "EEEE, MMMM d");
              const note = Array.isArray(notes) && notes.find(
                (n) => format(new Date(n.createdAt), "yyyy-MM-dd") === formattedDay
              );
              return (
                <CarouselItem key={index} className="md:basis-1 lg:basis-1/2">
                  <Card>
                    <CardContent className={`flex flex-col aspect-square items-start justify-start p-6 ${!isPastOrToday ? "bg-gray-200" : ""}`}>
                      <div className="w-full text-center">
                        <span className="text-lg font-semibold mb-2">{formattedDayOfWeek}</span>
                      </div>
                      <div className="w-full text-center mt-5">
                        {note ? (
                          <span className="text-2xl font-semibold">{note.content}</span>
                        ) : (
                          isPastOrToday && <AddEntry setNotes={setNotes} entryDate={formattedDay} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default EntryCarousel;
