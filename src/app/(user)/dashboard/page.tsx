import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/stat-card";
import ChallengeCard from "@/components/challenge-card";
import { getUserStats, getUserChallenges } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Trophy, Clock, DollarSign, Plus, Send } from "lucide-react";
import { Fragment } from "react";
import NoPage from "@/components/not-found";
import { getChallenges } from "@/lib/actions/challenges";
import { auth } from "@/lib/auth";
export default async function Dashboard() {
  const session = await auth();

  const { data: allChallenges } = await getChallenges();

  if (!session || !session.user) redirect("/login");
  const { data: stats } = await getUserStats(session.user.id!);
  const { data: yourChallenges } = await getUserChallenges(session.user.id!);
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
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-semibold tracking-tight">
            Hi, <span className="capitalize">{uName}</span>
          </h1>
          {user.role === "ADMIN" && (
            <Button asChild variant={"outline"} className="rounded-xl relative">
              <Link href="/challenge/create">
                <Plus className="size-4" />
                <span className="ml-2">Create challenge</span>
              </Link>
            </Button>
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
            <div className="mb-12 grid gap-6 grid-cols-2 sm:grid-cols-4">
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
