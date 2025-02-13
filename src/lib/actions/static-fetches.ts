"use server";

import { db } from "@/lib/db";

export async function getStaticChallenges() {
  try {
    const challenge = await db.challenge.findMany();

    return { data: challenge };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch challenge" };
  }
}

export async function getStaticAccounts() {
  try {
    const accounts = await db.user.findMany();

    return { data: accounts };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch accounts" };
  }
}
