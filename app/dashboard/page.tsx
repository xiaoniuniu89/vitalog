import SidePanel from "@/components/SidePanel/sidePanel";
import {
  DashboardInterface,
  DashboardUserMessage,
} from "@/components/Dashboard";
import { NextPage } from "next";
import AdvertisingBanner from "@/components/AdvertisingBanner/AdvertisingBanner";
import { currentUser } from "@clerk/nextjs";

const Home: NextPage = async () => {
  const user = await currentUser();
  const userData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
  return (
    <div className="flex dashboard min-h-[calc(100vh-60px)] ">
      <SidePanel />
      <div className="w-full p-5 justify-between flex flex-col bg-gray-50">
        <DashboardUserMessage user={userData} />
        <DashboardInterface />
        <AdvertisingBanner />
      </div>
    </div>
  );
};

export default Home;
