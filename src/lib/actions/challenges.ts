"use server";

import { db } from "@/lib/db";
import type {
  Challenge,
  UserChallengeStatus,
  ChallengeStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { redirect } from "next/navigation";

type CreateChallengeInput = Omit<Challenge, "id" | "createdAt" | "updatedAt">;

export async function getChallenges() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    // if (session.user.role !== "ADMIN") {
    //   return { error: "You are not authorized to fetch certified challenges" };
    // }
    const challenges = await db.challenge.findMany({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { data: challenges };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenges" };
  }
}

export async function getPopularChallenges() {
  try {
    const challenges = await db.challenge.findMany({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        participants: {
          _count: "desc",
        },
      },
    });
    return { data: challenges };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenges" };
  }
}

export async function checkIfJoined(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId: session.user.id,
        challengeId: id,
      },
    });
    return { data: { isJoined: userChallenge ? true : false } };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenges" };
  }
}

export async function getChallengesParticipatedByUser() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    const challenges = await db.userChallenge.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        challenge: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { data: challenges };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenges" };
  }
}

export async function getChallengeById(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    const challenge = await db.challenge.findFirst({
      where: { id },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        submissions: true,
      },
    });

    return { data: challenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenge" };
  }
}

export async function getEditChallengeById(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    const challenge = await db.challenge.findFirst({
      where: { id },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });
    if (session.user.role !== "ADMIN") {
      return { error: "Unauthorized access" };
    }
    return { data: challenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenge" };
  }
}

export async function createChallenge(input: CreateChallengeInput) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { error: "User not found" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: "You are not authorized to create challenge" };
    }
    const challenge = await db.challenge.create({
      data: {
        ...input,
        status: input.status || "Open",
      },
    });
    ["challenges", "explore", "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );

    return { data: challenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create challenge" };
  }
}

export async function joinChallenge(challengeId: string) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: "User not found" };
  }

  try {
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId: session.user.id,
        challengeId,
      },
      include: {
        challenge: true,
        user: true,
      },
    });
    const existingChallenge = await db.challenge.findFirst({
      where: {
        id: challengeId,
      },
      include: {
        participants: true,
      },
    });
    if (!existingChallenge) {
      return { error: "Challenge not found" };
    }
    if (existingChallenge?.status !== "Open") {
      return { error: "Challenge is not open for participation" };
    }
    if (
      existingChallenge?.maxParticipants &&
      (existingChallenge?.participants?.length ?? 0) >=
        existingChallenge.maxParticipants
    ) {
      return { error: "Challenge set participants limit is reached" };
    }

    if (userChallenge) {
      return { error: "You have already joined this challenge" };
    }

    const challenge = await db.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== "Open") {
      return { error: "Challenge is not open for participation" };
    }

    const joinChallenge = await db.userChallenge.create({
      data: {
        userId: session.user.id!,
        challengeId,
        status: "Ongoing",
      },
    });
    [`challenge/${challengeId}`, "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );

    return { data: joinChallenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create challenge" };
  }
}

export async function leaveChallenge(challengeId: string) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: "User not found" };
  }

  try {
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId: session.user.id,
        challengeId,
      },
      include: {
        challenge: true,
        user: true,
      },
    });
    if (!userChallenge) {
      return { error: "You haven't joined this challenge" };
    }
    const existingChallenge = await db.challenge.findFirst({
      where: {
        id: challengeId,
      },
      include: {
        participants: true,
      },
    });
    if (!existingChallenge) {
      return { error: "Challenge not found" };
    }
    if (existingChallenge?.status !== "Open") {
      return { error: "Challenge is closed" };
    }

    const challenge = await db.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge || challenge.status !== "Open") {
      return { error: "Challenge is not open" };
    }

    const leaveChallenge = await db.userChallenge.delete({
      where: {
        userId_challengeId: {
          userId: session.user.id!,
          challengeId,
        },
      },
    });
    [`challenge/${challengeId}`, "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );
    return { data: leaveChallenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create challenge" };
  }
}

export async function updateChallenge(id: string, input: CreateChallengeInput) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { data: "User not found" };
    }
    if (session.user.role !== "ADMIN") {
      return { error: "You are not authorized to create challenge" };
    }
    const challenge = await db.challenge.update({
      where: { id },
      data: input,
    });
    [`challenge/${id}`, "challenges", "explore", "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );

    return { data: challenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update challenge" };
  }
}

export async function deleteChallenge(id: string) {
  try {
    await db.challenge.delete({
      where: { id },
    });
    [`challenge/${id}`, "challenges", "explore", "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );
    redirect("/challenges");
    return { data: { success: true } };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete challenge" };
  }
}

export async function updateUserChallengeStatus(
  challengeId: string,
  status: UserChallengeStatus
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { data: "User not found" };
    }
    const userChallenge = await db.userChallenge.update({
      where: {
        userId_challengeId: {
          userId: session.user.id!,
          challengeId,
        },
      },
      data: { status },
    });
    revalidatePath(`challenge/${challengeId}`);
    return { data: userChallenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update status" };
  }
}

export async function updateChallengeStatus(
  challengeId: string,
  status: ChallengeStatus
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    if (session.user.role !== "ADMIN") {
      return {
        error: "You are not authorized to update user challenge status",
      };
    }
    const statusChallenge = await db.challenge.update({
      where: {
        id: challengeId,
      },
      data: { status },
    });
    revalidatePath(`challenge/${challengeId}`);
    return { data: statusChallenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update status" };
  }
}

export async function removeUserFromChallenge(
  challengeId: string,
  userId: string
) {
  const session = await auth();
  if (!session || !session.user) {
    return { error: "User not found" };
  }
  if (session.user.role === "ADMIN") {
    return { error: "Unauthorized access" };
  }
  try {
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId,
        challengeId,
      },
      include: {
        challenge: true,
        user: true,
      },
    });
    if (!userChallenge) {
      return { error: "User not on this challenge" };
    }
    if (userChallenge.status === "Completed" || userChallenge.challenge.status !== "Open") {
      return { error: "Challenge status unavailable" };
    }
    const existingChallenge = await db.challenge.findFirst({
      where: {
        id: challengeId,
      },
      include: {
        participants: true,
      },
    });
    if (!existingChallenge) {
      return { error: "Challenge not found" };
    }
    const leaveChallenge = await db.userChallenge.delete({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
    });
    [`challenge/${challengeId}`, "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );
    return { data: leaveChallenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create challenge" };
  }
}
