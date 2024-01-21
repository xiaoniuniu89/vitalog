import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect } from "react";
import { DiaryEntry } from "@prisma/client";
import { useApplicationContext } from "@/context/ApplicationContext";

type ResponseDrawerProps = {
  formattedDayOfWeek: string;
  note: DiaryEntry;
};

export default function ResponseDrawer(props: ResponseDrawerProps) {
  const { formattedDayOfWeek, note } = props;
  const [analysis, setAnalysis] = React.useState<string | null>(note?.analysis);
  // @ts-ignore
  const { notes, setNotes } = useApplicationContext();

  useEffect(() => {
    // @ts-ignore
    const drawerNote = notes.find((n) => n.id === note?.id);
    setAnalysis(drawerNote?.analysis);
  }, [notes, note?.id]);

  return (
    <Drawer>
      {analysis && (
        <DrawerTrigger asChild>
          <Button
            className="absolute right-0 bottom-0 w-[3rem] h-[3rem] cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-500"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            }}
          />
        </DrawerTrigger>
      )}

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              Nutrition feedback for {formattedDayOfWeek}
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                {analysis ? (
                  <div className="text-lg ">{analysis}</div>
                ) : (
                  <div className="text-lg ">No analysis available</div>
                )}
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
  );
}
