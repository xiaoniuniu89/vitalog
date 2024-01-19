import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
import { startOfWeek, endOfWeek } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export const getDiaryEntries = async (req: NextRequest) => {
    const user = await currentUser();
    console.log("USERID", user?.id)

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
    console.log("REQ", req)
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

export async function POST(request: NextRequest) {
  const res = await createNewDiaryEntry(request);
  if (res.status !== 200) {
    return NextResponse.json({ error: res.error, status: res.status });
  }
  return NextResponse.json({ data: res.data, status: res.status });
}

export async function GET(request: NextRequest, response: Response) {
  const res = await getDiaryEntries(request);
  if (res.status === 500) {
    return NextResponse.json({ error: res.message, status: 500 });
  }
  return Response.json({ data: res, status: 200 });
}
