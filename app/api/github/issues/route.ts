import { NextRequest, NextResponse } from "next/server";
import oktokit from "@/lib/github";

export async function POST(request: NextRequest) {
  if (!request.body) return { error: "There was a server error", status: 500 };

  try {
    const { title, label, content } = await request.json();

    const res = await oktokit.request(
      "POST /repos/xiaoniuniu89/vitalog/issues",
      {
        owner: "vitalog",
        repo: "REPO",
        title: title,
        body: content,
        assignees: ["xiaoniuniu89"],
        labels: [label],
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    return NextResponse.json({
      message: "Submitted successfully",
      status: res.status,
    });
  } catch (error) {
    return NextResponse.json({
      // @ts-ignore
      message: (error.message as string) || "There was a server error",
      status: 500,
    });
  }
}
