"use client";
import React from "react";
import { Daily, Weekly } from "@/components/Dashboard";
import { useApplicationContext } from "@/context/ApplicationContext";

function DashboardInterface() {
  const { dashboard } = useApplicationContext();

  return (
    <>
      {dashboard.daily && <Daily />}
      {dashboard.weekly && <Weekly />}
    </>
  );
}

export default DashboardInterface;
