import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "@/components/ui/card";
import type { Challenge } from "@prisma/client";
import { differenceInDays } from "date-fns";
import Link from "next/link";
import { getStatus } from "@/lib/actions/status";

export default async function ChallengeCard({
  challenge,
}: {
  challenge: Challenge;
}) {
  const req = await getStatus(challenge.id);
  const challengeStatus = req?.data || null;
  return (
    <Card className="overflow-hidden self-start">
      <div className="border-b p-6 space-y-2">
        <div className="flex gap-1 justify-between">
          <div className="">
            <h3 className="font-medium">{challenge.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {challenge.projectDescription}
            </p>
          </div>
          <div className="self-start">
            {challengeStatus ? (
              challengeStatus.submissions?.[0]?.status === "Accepted" ? (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800">
                  Accepted
                </Badge>
              ) : challengeStatus.participants?.[0]?.status === "Ongoing" ? (
                <Badge className="bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800">
                  Ongoing
                </Badge>
              ) : challengeStatus.status === "Canceled" ? (
                <Badge className="bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800">
                  Canceled
                </Badge>
              ) : challengeStatus.status === "Postponed" ? (
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
                  Postponed
                </Badge>
              ) : challengeStatus.submissions?.[0]?.status === "Rejected" ? (
                <Badge className="bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800">
                  Rejected
                </Badge>
              ) : challengeStatus.submissions?.[0]?.status ===
                "NeedsRevision" ? (
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-800">
                  Needs revision
                </Badge>
              ) : challengeStatus.submissions?.[0]?.status === "Submitted" ? (
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800">
                  Submitted
                </Badge>
              ) : challengeStatus.participants?.[0]?.status === "Open" ? (
                <Badge className="bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800">
                  Joined
                </Badge>
              ) : challengeStatus.status === "Closed" ? (
                <Badge className="bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-800">
                  Closed
                </Badge>
              ) : challengeStatus.status === "Open" ? (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800">
                  Open
                </Badge>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Skills Needed:</p>
            <div className="flex flex-wrap gap-2">
              {challenge.skills.map((skill) => (
                <Badge variant="secondary" key={skill}>
                  {" "}
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Seniority Level:</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {challenge.level}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Timeline:</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {differenceInDays(
                  new Date(challenge.endDate),
                  new Date(challenge.startDate)
                )}{" "}
                days
              </p>
            </div>
          </div>
          <div className="">
            <Button className="w-full" asChild size={"sm"}>
              <Link href={`/challenge/${challenge.id}`}>View Challenge</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
