import { startOfWeek, endOfWeek } from "date-fns";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export const getDiaryEntries = async (req: NextRequest) => {
    const user = await currentUser();
  try {
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });

    const notes = await prisma.diaryEntry.findMany({
      where: {
        userId: user?.id as string,
        createdAt: {
          gte: startOfCurrentWeek,
          lte: endOfCurrentWeek,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return { notes, status: 200 };
  } catch (error) {
    console.error("Error fetching diary entries:", error);
    return {
      message: "An error occurred while fetching diary entries",
      status: 500,
    };
  }
};

export const createNewDiaryEntry = async (req: NextRequest) => {
    const user = await currentUser();
  
    try {
      // @ts-ignore
      const { entry, createdAt } = await req.json();
      if (!user?.id) {
        return { error: "User ID is missing or not authenticated", status: 401 };
      }
  
      const newEntry = await prisma.diaryEntry.create({
        data: {
          content: entry,
          createdAt: new Date(createdAt),
          userId: user.id,
        },
      });
  
      return { data: newEntry, status: 200 };
    } catch (error) {
      console.error("Error creating new diary entry:", error);
      return {
        error: "An error occurred while creating a new diary entry",
        status: 500,
      };
    }
  };