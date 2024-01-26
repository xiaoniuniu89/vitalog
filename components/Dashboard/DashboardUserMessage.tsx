"use client";
import React from "react";
import { format, startOfWeek } from "date-fns";
import { useApplicationContext } from "@/context/ApplicationContext";

function DashboardUserMessage({
  user,
}: {
  user: {
    firstName: string | null | undefined;
    lastName: string | null | undefined;
  };
}) {
  const { dashboard } = useApplicationContext();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const currentWeek = `2024 Week ${format(weekStart, "w")}`;
  if (!user) {
    return <div className="flex justify-center items-center "> <h2>Loading...</h2></div>;
  }
  return (
    <div>
      {dashboard.daily && (
        <>
          <div className="flex justify-center items-center ">
            <h2 className="text-2xl">
              {user?.firstName} {user?.lastName}
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <h2 className="text-2xl">Vita Log for {currentWeek}</h2>
          </div>
        </>
      )}

      {dashboard.weekly && (
        <>
          <div className="flex justify-center items-center">
            <h2 className="text-2xl">Your weekly vitalog analysis</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardUserMessage;
