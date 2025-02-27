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

export const checkIfJoined = async (challengeId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      console.error("Unauthorized access attempt");
      return false;
    }
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId: session.user.id,
        challengeId,
      },
    });
    const isJoined = userChallenge ? true : false;
    return isJoined;
  } catch (error) {
    console.error(error);
    return false;
  }
};
