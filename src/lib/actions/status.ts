import { db } from "@/lib/db";
import { auth } from "../auth";
export async function getStatus(challengeId: string) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      console.error("Unauthorized access attempt");
      return { error: "Unauthorized" };
    }
    const status = await db.challenge.findUnique({
      where: {
        id: challengeId,
      },
      select: {
        status: true,
        participants: {
          where: {
            userId: session.user.id,
          },
          select: {
            status: true,
          },
        },
        submissions: {
          where: {
            userId: session.user.id,
          },
          select: {
            status: true,
          },
        },
      },
    });

    if (!status) {
      return { error: "Challenge not found" };
    }
    return { data: status };
  } catch (error) {
    console.error({ error });
    return { error: "Internal server error" };
  }
}
