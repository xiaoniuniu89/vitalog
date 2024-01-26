import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Loader from "@/components/Loader/Loader";
import useWeeklySummary from "./useWeeklySummary";
import { WeeklySummary } from "@prisma/client";

const WeeklySummaryDisplay = () => {
  const { weeklySummaries, isLoading } = useWeeklySummary();

  if (isLoading) {
    return <Loader />;
  }

  if (!weeklySummaries || weeklySummaries.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        <h2 className="text-2xl">No weekly summaries available.</h2>
      </div>
    );
  }

  return (
    <div className="w-1/4">
      {weeklySummaries.map((summary: WeeklySummary, index: number) => (
        <Card key={index}>
          <CardTitle>
            Week of {format(new Date(summary.createdAt), "MMMM do")}
          </CardTitle>
          <CardContent>
            <p>{summary.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeeklySummaryDisplay;
