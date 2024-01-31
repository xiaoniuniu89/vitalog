import prisma from "@/lib/db";
import { createWeeklySummary } from "@/lib/openAI/promptOpenAI";
import { startOfWeek, getWeek, endOfWeek } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendSummary";
import { currentUser } from "@clerk/nextjs";
import { use } from "react";

export async function GET(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ status: 401 });
  }

  try {
    const weeklySummaries = await prisma.weeklySummary.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      data: weeklySummaries,
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving weekly summaries:", error);
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentDate = new Date();
    const weekOfYear = getWeek(startOfWeek(currentDate, { weekStartsOn: 0 }));
    const year = currentDate.getFullYear();
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 });

    // Fetch all users
    const users = await prisma.user.findMany();

    for (const user of users) {
      const userId = user.id;

      const notes = await prisma.diaryEntry.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfCurrentWeek,
            lte: endOfCurrentWeek,
          },
        },
        orderBy: { createdAt: "asc" },
      });

      const openAIResponse = await createWeeklySummary(notes);

      const summary = openAIResponse.choices[0].message.content;

      if (summary) {
        const weeklySummary = await prisma.weeklySummary.create({
          data: {
            userId,
            weekOfYear,
            year,
            summary,
          },
        });

        await sendEmail(
          user.email,
          weeklySummary,
          user.first_name as string,
          user.last_name as string,
        );
      }
    }

    return NextResponse.json({
      message: "Weekly summaries created",
      status: 201,
    });
  } catch (error) {
    console.error("Error creating weekly summaries:", error);
    return NextResponse.json({ error: error, status: 500 });
  }
}
