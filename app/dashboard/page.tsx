import DashboardUserMessage from "@/components/DashboardUserMessage/DashboardUserMessage";
import SidePanel from "@/components/SidePanel/sidePanel";
import EntryCarousel from "@/components/Carousel/entryCarousel";
import AdvertisingBanner from "@/components/AdvertisingBanner/AdvertisingBanner";

import { NextPage } from "next";

const Home: NextPage = async () => {
  return (
    <div className="flex dashboard min-h-[calc(100vh-60px)] ">
      <SidePanel />
      <div className="w-full p-5 justify-between flex flex-col">
        <DashboardUserMessage />
        <EntryCarousel />
        <AdvertisingBanner />
      </div>
    </div>
  );
};

export default Home;
