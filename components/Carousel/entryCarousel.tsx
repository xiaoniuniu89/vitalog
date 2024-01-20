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
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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

function EntryCarousel() {
  const { isLoading, notes, setNotes, setApi, dayIndex, today } =
    useEntryCarousel();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
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
                                setNotes={setNotes}
                                entryDate={formattedDay}
                              />
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <div
                      className="absolute right-0 bottom-0 w-[3rem] h-[3rem] cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-500"
                      style={{
                        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                      }}
                      onClick={() => alert(`clicked ${formattedDayOfWeek}`)}
                    />
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
