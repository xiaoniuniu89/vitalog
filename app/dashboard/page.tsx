import DashboardUserMessage from "@/components/DashboardUserMessage/DashboardUserMessage";
import SidePanel from "@/components/SidePanel/sidePanel";
import EntryCarousel from "@/components/Carousel/entryCarousel";

import { NextPage } from "next";

const Home: NextPage = async () => {
  return (
    <div className="flex dashboard bg-red-200">
      <SidePanel />
      <div className="w-full min-h-[80vh] p-5 bg-yellow-200">
        <DashboardUserMessage />
        <EntryCarousel />
      </div>
    </div>
  );
};

export default Home;
