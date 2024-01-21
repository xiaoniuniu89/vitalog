"use client";
import React from "react";
import {
  format,
  startOfWeek,
  addDays,
  differenceInCalendarDays,
} from "date-fns";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import AddEntry from "../AddEntry/AddEntry";
import useEntryCarousel from "./useEntryCarousel";
import Loader from "../Loader/Loader";

import ResponseDrawer from "../ResponseDrawer/ResponseDrawer";


function EntryCarousel() {
  const { isLoading, notes, handleSave, setApi, dayIndex, today } =
    useEntryCarousel();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center align-middle entryCarousel py-10">
      <div className="flex flex-col justify-center">
        <Carousel
          opts={{ startIndex: dayIndex }}
          setApi={setApi}
          className="w-full max-w-3xl"
        >
          <CarouselContent>
            {Array.from({ length: 7 }).map((_, index) => {
              const day = addDays(
                startOfWeek(new Date(), { weekStartsOn: 0 }),
                index
              );
              const formattedDay = format(day, "yyyy-MM-dd");
              const isPastOrToday = differenceInCalendarDays(day, today) <= 0;
              const formattedDayOfWeek = format(day, "EEEE, MMMM d");
              const note =
                Array.isArray(notes) &&
                notes.find(
                  (n) =>
                    format(new Date(n.createdAt), "yyyy-MM-dd") === formattedDay
                );
              return (
                <CarouselItem key={index} className="md:basis-1 lg:basis-1/2">
                  <div className="relative">
                    <Card>
                      <CardTitle>{formattedDayOfWeek}</CardTitle>
                      <CardContent
                        className={`flex flex-col aspect-square items-start justify-start p-6 ${
                          !isPastOrToday ? "bg-gray-200" : ""
                        }`}
                      >
                        <div className="w-full text-center">
                          {note ? (
                            <span className="text-lg">{note.content}</span>
                          ) : (
                            isPastOrToday && (
                              <AddEntry
                                handleSave={handleSave}
                                entryDate={formattedDay}
                              />
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <ResponseDrawer note={note} formattedDayOfWeek={formattedDayOfWeek} />
                  </div>
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
