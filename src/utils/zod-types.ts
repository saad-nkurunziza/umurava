import * as z from "zod";
import { ChallengeLevel, ChallengeStatus } from "@prisma/client";

export const challengeFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),

  // Project details
  projectDescription: z.string().max(250, {
    message: "Project description must not exceed 250 characters.",
  }),
  projectBrief: z.string().max(50, {
    message: "Project brief must not exceed 50 characters.",
  }),
  projectTasks: z.array(z.string()),
  requirements: z.array(z.string()),
  skills: z.array(z.string()),

  level: z.nativeEnum(ChallengeLevel),
  prize: z.coerce.number(),
  status: z.nativeEnum(ChallengeStatus),
  maxParticipants: z.coerce.number(),

  // Dates
  startDate: z.date({
    required_error: "A start Date is required.",
  }),
  endDate: z.date({
    required_error: "A end Date is required.",
  }),
});

export const submitFormSchema = z.object({
  codebaseLink: z.string(),

  moreInfo: z.string().max(500, {
    message: "Max is 500 characters.",
  }),
});
