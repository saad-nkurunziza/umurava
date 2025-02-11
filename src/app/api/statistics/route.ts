import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const ongoingChallenges = await db.userChallenge.count({
      where: {
        userId: session.user.id,
        status: "Ongoing",
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!ongoingChallenges)
      return NextResponse.json(
        { message: "No challenges found" },
        { status: 404 }
      );
    return NextResponse.json({ data: { ongoingChallenges } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
