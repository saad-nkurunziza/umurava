import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, BookOpen, Award, ChevronRight } from "lucide-react";
import type {
  Challenge,
  ChallengeStatus,
  DeliverableStatus,
  UserChallengeStatus,
} from "@prisma/client";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import { getStatus, checkIfJoined } from "@/lib/actions/status";

function getStatusBadge(
  challengeStatus: {
    status: ChallengeStatus;
    participants: {
      status: UserChallengeStatus;
    }[];
    submissions: {
      status: DeliverableStatus;
    }[];
  } | null
) {
  if (!challengeStatus) return null;

  const statusConfig = {
    Accepted: {
      condition: () => challengeStatus.submissions?.[0]?.status === "Accepted",
      variant: "green" as const,
    },
    Ongoing: {
      condition: () => challengeStatus.participants?.[0]?.status === "Ongoing",
      variant: "blue" as const,
    },
    Canceled: {
      condition: () => challengeStatus.status === "Canceled",
      variant: "red" as const,
    },
    Postponed: {
      condition: () => challengeStatus.status === "Postponed",
      variant: "amber" as const,
    },
    Rejected: {
      condition: () => challengeStatus.submissions?.[0]?.status === "Rejected",
      variant: "pink" as const,
    },
    "Needs revision": {
      condition: () =>
        challengeStatus.submissions?.[0]?.status === "NeedsRevision",
      variant: "yellow" as const,
    },
    Submitted: {
      condition: () => challengeStatus.submissions?.[0]?.status === "Submitted",
      variant: "purple" as const,
    },
    Joined: {
      condition: () => challengeStatus.participants?.[0]?.status === "Open",
      variant: "blue" as const,
    },
    Closed: {
      condition: () => challengeStatus.status === "Closed",
      variant: "gray" as const,
    },
    Open: {
      condition: () => challengeStatus.status === "Open",
      variant: "green" as const,
    },
  };

  for (const [status, { condition, variant }] of Object.entries(statusConfig)) {
    if (condition()) {
      return <Badge variant={variant}>{status}</Badge>;
    }
  }

  return null;
}

export default async function ChallengeCard({
  challenge,
}: {
  challenge: Challenge;
}) {
  const req = await getStatus(challenge.id);
  const challengeStatus = req?.data || null;
  const isJoined = await checkIfJoined(challenge.id);
  return (
    <div className="self-start border rounded-lg max-w-md transition-all duration-300">
      <div className="p-5 pb-0">{getStatusBadge(challengeStatus)}</div>

      <div className="p-5">
        <h3 className="text-lg font-medium mb-1"> {challenge.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
          {" "}
          {challenge.projectDescription}
        </p>

        <div className="flex gap-4 mb-4 text-xs">
          <div className="flex items-center text-muted-foreground/80">
            <Clock size={14} className="mr-1" />
            <span>
              {" "}
              {differenceInDays(
                new Date(challenge.endDate),
                new Date(challenge.startDate)
              )}{" "}
              days
            </span>
          </div>
          <div className="flex items-center text-muted-foreground/80">
            <BookOpen size={14} className="mr-1" />
            <span>{challenge.level}</span>
          </div>
          <div className="flex items-center text-muted-foreground/80">
            <Award size={14} className="mr-1" />
            <span>{challenge.prize}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {challenge.skills.map((skill) => (
              <Badge variant="secondary" key={skill}>
                {" "}
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* <div className="mb-5">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">35%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-background h-1 rounded-full"
              style={{ width: "35%" }}
            ></div>
          </div>
        </div> */}

        <Button
          asChild
          className="w-full py-2 rounded-md flex items-center justify-center text-sm font-medium "
        >
          <Link href={`/challenge/${challenge.id}`}>
            {isJoined ? "Continue" : "Start"}{" "}
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
