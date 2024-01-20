import React from "react";
import { currentUser } from "@clerk/nextjs";
import { format, startOfWeek } from "date-fns";

async function DashboardUserMessage({}) {
  const user = await currentUser();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const currentWeek = `2024 Week ${format(weekStart, "w")}`;
  return (
    <div>
      <div className="flex justify-center items-center ">
        <h2 className="text-2xl">
          {user?.firstName} {user?.lastName}
        </h2>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="text-2xl">Vita Log for {currentWeek}</h2>
      </div>
    </div>
  );
}

export default DashboardUserMessage;
