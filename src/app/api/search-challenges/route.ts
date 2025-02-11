import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json({ data: [] });
    }

    const challenges = await db.challenge.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { projectDescription: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        _count: {
          select: { participants: true },
        },
      },
    });

    return NextResponse.json({ data: challenges });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
