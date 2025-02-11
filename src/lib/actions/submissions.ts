"use server";
import type { DeliverableStatus } from "@prisma/client";
import { auth } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function makeSubmission(
  challengeId: string,
  values: { codebaseLink: string; moreInfo: string }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return { error: "User not authenticated." };
    }

    const userId = session.user.id!;

    const userChallenge = await db.userChallenge.findFirst({
      where: { userId, challengeId },
      include: { challenge: true },
    });

    if (!userChallenge) {
      return { error: "User not participating in this challenge." };
    }

    const { challenge } = userChallenge;

    if (challenge.status !== "Open" || challenge.endDate < new Date()) {
      return { error: "Challenge is either closed or expired." };
    }
    const [deliverable] = await db.$transaction([
      db.deliverable.create({
        data: {
          challengeId,
          userId,
          codebase_link: values.codebaseLink,
          more_info: values.moreInfo,
        },
      }),
      db.userChallenge.update({
        where: { userId_challengeId: { userId, challengeId } },
        data: { status: "Completed" },
      }),
    ]);

    ["challenges", "explore", "dashboard"].forEach((path) =>
      revalidatePath(`/${path}`)
    );

    return { data: deliverable };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update challenge" };
  }
}

export async function getSubmissions() {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "ADMIN")
      return { error: "Unauthorized" };
    const submissions = await db.deliverable.findMany({
      include: {
        user: true,
        challenge: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: submissions };
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { error: "Internal server error" };
  }
}

export async function changeDeliverableStatus(
  submissionId: string,
  status: DeliverableStatus
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "User not authenticated" };
    }

    if (session.user.role !== "ADMIN") {
      return { error: "Only admins can change deliverable status" };
    }

    const deliverable = await db.deliverable.update({
      where: { id: submissionId },
      data: {
        status,
      },
      include: {
        challenge: true,
      },
    });
    [
      `challenge/${deliverable.challengeId}`,
      "dashboard",
      "submissions",
    ].forEach((path) => revalidatePath(`/${path}`));
    return { data: deliverable };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update deliverable status" };
  }
}

export async function checkIfSubmission(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { error: "User not found" };
    }
    const userChallenge = await db.deliverable.findFirst({
      where: {
        userId: session.user.id,
        challengeId: id,
      },
    });
    return { data: { isSubmitted: userChallenge ? true : false } };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenges" };
  }
}
