import { format, startOfWeek } from "date-fns";
import SidePanel from "@/components/SidePanel/sidePanel";
import EntryCarousel from "@/components/Carousel/entryCarousel";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextPage } from "next";

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5   

const Home: NextPage = async () => {

  const user = await currentUser();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const currentWeek = `2024 Week ${format(weekStart, "w")}`;

  return (
    <div className="flex dashboard">
      <SidePanel />
      <div className="w-full min-h-full p-5">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <h2 className="text-2xl">Vita Log for {currentWeek}</h2>
        </div>

        <EntryCarousel />
      </div>
    </div>
  );
}

export default Home;
