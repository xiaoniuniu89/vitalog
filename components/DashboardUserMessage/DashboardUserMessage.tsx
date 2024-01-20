import React from "react";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { format, startOfWeek } from "date-fns";

async function DashboardUserMessage({}) {
  const user = await currentUser();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const currentWeek = `2024 Week ${format(weekStart, "w")}`;
  return (
    <div className="bg-green-300">
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
