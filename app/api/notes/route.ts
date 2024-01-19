import { NextRequest, NextResponse } from "next/server";
import { createNewDiaryEntry, getDiaryEntries } from "@/handlers/notes";


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
