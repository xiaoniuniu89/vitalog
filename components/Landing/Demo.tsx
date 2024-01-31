"use client";
import React from "react";
import { format } from "date-fns";
import { Maximize2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";

function Demo() {
  const note = {
    content:
      "Today i ate mc Donalds for lunch. A big mac meal with a coffee. I had 2 rich tea biscuits and a large bowl of spaghetti bolognese for dinner. I also had a non alcoholic beer.",
    analysis:
      "Your meal was high in calories and saturated fats, mostly from the Big Mac meal which contains about 540 calories and 10g of saturated fat. The spaghetti bolognese and biscuits add roughly 500-700 calories and about 5-10g of saturated fat. The recommended daily intake is around 2000-2500 calories and 20g of saturated fat. So, you're within the calorie limit but near or over the limit for saturated fats. Try to incorporate more fruits, vegetables, and lean proteins for a balanced diet.",
  };

  const formattedDayOfWeek = format(new Date(), "EEEE, MMMM d");

  return (
    <section className="py-8 bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            What does a Vita log look like?
          </h2>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/4 px-5 pt-8">
          <div className="relative">
            <Card className="mx-auto">
              <CardTitle>{formattedDayOfWeek}</CardTitle>
              <CardContent className="flex flex-col aspect-square items-start justify-start p-6">
                <div className="w-full text-center">
                  <span className="text-lg">{note.content}</span>
                </div>
              </CardContent>
            </Card>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="absolute right-0 bottom-0 w-[3rem] h-[3rem] cursor-pointer rounded-lg bg-vita-green hover:bg-green-700 transition-colors duration-500"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <Maximize2 className="h-6 w-6 absolute right-0 bottom-0" />
                </Button>
              </DrawerTrigger>

              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>
                      Nutrition feedback for {formattedDayOfWeek}
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex-1 text-center">
                        <div className="text-lg ">{note.analysis}</div>
                      </div>
                    </div>
                    <div className="mt-3 h-[120px]"></div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Demo;
