import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/stat-card";
import ChallengeCard from "@/components/challenge-card";
import { getUserStats, getUserChallenges, makeAdmin } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Trophy, Clock, DollarSign, Plus, Send } from "lucide-react";
import { Fragment } from "react";
import NoPage from "@/components/not-found";
import { getChallenges } from "@/lib/actions/challenges";
import { auth } from "@/lib/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) redirect("/login");

  const challengesData = getChallenges();
  const userStatsData = getUserStats(session.user.id!);
  const userChallengesData = getUserChallenges(session.user.id!);
  const [challenges, userStats, userChallenges] = await Promise.all([
    challengesData,
    userStatsData,
    userChallengesData,
  ]);

  const { data: allChallenges } = challenges;
  const { data: stats } = userStats;
  const { data: yourChallenges } = userChallenges;
  const user = session.user;

  const isEmpty =
    (!yourChallenges || yourChallenges.length === 0) &&
    (!allChallenges || allChallenges.length === 0)
      ? true
      : false;

  const statData = [
    {
      icon: <Trophy className="h-3.5 w-3.5" />,
      value: stats?.completed || 0,
      label:
        session.user.role === "ADMIN"
          ? "Completed Challenges"
          : "Challenges Completed",
    },
    {
      icon: <Clock className="h-3.5 w-3.5" />,
      value: stats?.ongoing || 0,
      label:
        session.user.role === "ADMIN"
          ? "Ongoing Challenges"
          : "Challenges Ongoing",
    },
    {
      icon: <Send className="h-3.5 w-3.5" />,
      value: stats?.accepted || 0,
      label:
        session.user.role === "ADMIN"
          ? "Rewarded challenges"
          : "Challenges Accepted",
    },
    {
      icon: <DollarSign className="h-3.5 w-3.5" />,
      value: `$${stats?.earnings || 0}`,
      label: session.user.role === "ADMIN" ? "Total Payments" : "Earnings",
    },
  ];
  const uName = String(user.name)
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        <div className="mb-12 flex items-end justify-between">
          <h1 className="font-semibold tracking-tight">
            Hi, <span className="capitalize">{uName}</span>
          </h1>
          {user.role === "ADMIN" && (
            <Button asChild variant={"outline"} className="rounded-xl relative">
              <Link href="/challenge/create">
                <Plus className="size-4" />
                <span className="ml-2 hidden sm:flex">Create challenge</span>
              </Link>
            </Button>
          )}
          {user.role === "USER" && (
            <form
              action={async () => {
                "use server";
                await makeAdmin(user.id ?? "");
              }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      type="submit"
                      className="rounded-xl relative"
                    >
                      <Plus className="size-4" />
                      <span className="ml-2 hidden sm:flex">
                        Make yourself admin
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Make urself admin for testing purposes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          )}
        </div>
        {isEmpty ? (
          <div>
            <NoPage>
              <h2 className="text-xl font-semibold mb-2">No Challenges Yet</h2>
              <p className="text-sm text-muted-foreground mb-6">
                It seems no challenges have been created yet.{" "}
                {user.role === "ADMIN"
                  ? "Create a challenge now!"
                  : "Check back later."}
              </p>
            </NoPage>
          </div>
        ) : (
          <Fragment>
            <div className="mb-12 grid gap-6 grid-cols-1 sm:grid-cols-4">
              {statData.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            {yourChallenges && yourChallenges.length > 0 && (
              <div className="mb-12">
                <Card className="p-6">
                  <h3 className="mb-6 text-lg font-medium">
                    Upcoming Deadlines
                  </h3>
                  <div className="space-y-6">
                    {yourChallenges?.map((challenge) => (
                      <div key={challenge.id} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{challenge.title}</p>
                          <Badge variant="outline">
                            {new Date(challenge.endDate).toLocaleDateString()}
                          </Badge>
                        </div>
                        <Progress
                          value={
                            challenge.participants[0]?.status === "Completed"
                              ? 100
                              : 50
                          }
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {yourChallenges && yourChallenges.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Challenges</h2>
                  <Button variant="link" asChild>
                    <Link href="/challenges">See all</Link>
                  </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {yourChallenges?.slice(0, 3).map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )}
        {allChallenges && allChallenges.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Challenges</h2>
              <Button variant="link" asChild>
                <Link href="/explore">See all</Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allChallenges?.slice(0, 3).map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
