"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WeeklySummary } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const weeklyColumns: ColumnDef<WeeklySummary>[] = [
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "weekOfYear",
    header: "Week",
  },
  {
    accessorKey: "summary",
    header: "Summary",
    cell: ({ row }) => {
      const summary = row.original;

      return (
        <Dialog>
          <DialogTrigger><Button type="button" variant="vitaGreen">
                  Open
                </Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Summary for {summary.year} week {summary.weekOfYear}
              </DialogTitle>
              <div className="p-2 text-gray-600 tracking-wide">{summary.summary}</div>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
