import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const challenges = await db.userChallenge.findMany({
      where: {
        userId: session.user.id,
        status: "Ongoing",
      },
      include: {
        challenge: true,
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!challenges) {
      return NextResponse.json(
        { error: "No challenges found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: challenges }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
