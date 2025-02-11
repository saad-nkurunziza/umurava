"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { DeliverableStatus } from "@prisma/client";

export async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.email) return { error: "Not authenticated" };

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        challenges: true,
      },
    });
    return { data: user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch user" };
  }
}

export async function getTokenUser(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return { data: user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch user" };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        challenges: true,
      },
    });
    return { data: user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch user" };
  }
}

export async function getUserStats(userId: string) {
  try {
    const session = await auth();

    if (session?.user.role === "USER") {
      const stats = await db.userChallenge.groupBy({
        by: ["status"],
        where: {
          user: { id: userId },
        },
        _count: true,
      });

      const submittedChallenges = await db.deliverable.groupBy({
        by: ["status"],
        where: {
          userId,
        },
        _count: true,
      });

      const totalEarnings = await db.challenge.aggregate({
        where: {
          submissions: {
            some: {
              user: { id: userId },
              status: DeliverableStatus.Accepted,
            },
          },
        },
        _sum: { prize: true },
      });

      return {
        data: {
          completed:
            submittedChallenges.find((s) => s.status === "Submitted")?._count ??
            0,
          ongoing: stats.find((s) => s.status === "Ongoing")?._count ?? 0,
          accepted:
            submittedChallenges.find((s) => s.status === "Accepted")?._count ??
            0,
          earnings: totalEarnings._sum.prize ?? 0,
        },
      };
    } else if (session?.user.role === "ADMIN") {
      const stats = await db.userChallenge.groupBy({
        by: ["status"],
        _count: true,
      });

      const submittedChallenges = await db.deliverable.groupBy({
        by: ["status"],
        _count: true,
      });

      const totalEarnings = await db.challenge.aggregate({
        where: {
          submissions: {
            some: {
              status: DeliverableStatus.Accepted,
            },
          },
        },
        _sum: { prize: true },
      });

      return {
        data: {
          completed:
            submittedChallenges.find((s) => s.status === "Submitted")?._count ??
            0,
          ongoing: stats.find((s) => s.status === "Ongoing")?._count ?? 0,
          accepted:
            submittedChallenges.find((s) => s.status === "Accepted")?._count ??
            0,
          earnings: totalEarnings._sum.prize ?? 0,
        },
      };
    } else {
      return { error: "Failed to fetch stats" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch stats" };
  }
}

export async function getAdminStats() {
  try {
    const stats = await db.challenge.groupBy({
      by: ["status"],
      _count: true,
    });
    const otherStats = await db.userChallenge.groupBy({
      by: ["status"],
      _count: true,
    });
    const payments = await db.challenge.findMany({
      where: {
        participants: {
          some: {
            status: "Completed",
          },
        },
      },
      include: {
        participants: {
          where: {
            status: "Completed",
          },
        },
      },
    });

    const totalPaid = payments.reduce((sum, challenge) => {
      const prizeAmount = challenge.prize;
      const allParticipants = challenge.participants.length;
      const challengePayment = prizeAmount * allParticipants;
      return sum + challengePayment;
    }, 0);

    return {
      data: {
        totalStats: stats.length,
        open: stats.find((s) => s.status === "Open")?._count ?? 0,
        canceled: stats.find((s) => s.status === "Canceled")?._count ?? 0,
        postponed: stats.find((s) => s.status === "Postponed")?._count ?? 0,
        completed:
          otherStats.find((s) => s.status === "Completed")?._count ?? 0,
        ongoing: otherStats.find((s) => s.status === "Ongoing")?._count ?? 0,
        totalPaid,
      },
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch stats" };
  }
}

export async function getUserChallenges(userId: string) {
  try {
    const challenges = await db.challenge.findMany({
      where: {
        participants: {
          some: {
            user: { id: userId },
          },
        },
      },
      include: {
        participants: {
          where: {
            user: { id: userId },
          },
        },
      },
      orderBy: { endDate: "asc" },
    });

    return { data: challenges };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenges" };
  }
}
