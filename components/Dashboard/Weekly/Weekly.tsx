import React from "react";
import { format } from "date-fns";
import Loader from "@/components/Loader/Loader";
import { WeeklySummary } from "@prisma/client";
import useWeeklySummary from "./useWeeklySummary";
import { weeklyColumns } from "@/components/DataTable/Colums/WeeklyColums";
import { DataTable } from "@/components/DataTable/DataTable";

const WeeklySummaryDisplay = () => {
  const { weeklySummaries, isLoading } = useWeeklySummary();

  if (isLoading) {
    return <Loader />;
  }

  if (!weeklySummaries) {
    return (
      <div className="flex justify-center items-center ">
        <h2 className="text-2xl">No weekly summaries available.</h2>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 mx-auto pt-8 mb-auto">
      <DataTable<WeeklySummary, string>
        columns={weeklyColumns}
        data={weeklySummaries}
      />
    </div>
  );
};

export default WeeklySummaryDisplay;
