import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChallengeCard from "@/components/challenge-card";
import { getChallengesParticipatedByUser } from "@/lib/actions/challenges";
import { Home, TrendingUp } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function YourChallengesPage() {
  const res = await getChallengesParticipatedByUser();

  if (!res || res.error || !res.data) {
    return notFound();
  }

  const challenges = res.data;

  const tabs = [
    { name: "All Challenges", count: challenges.length, value: "All" },
    {
      name: "Completed",
      count: challenges.filter((c) => c.status === "Completed").length,
      value: "Completed",
    },
    {
      name: "Open",
      count: challenges.filter((c) => c.status === "Open").length,
      value: "Open",
    },
    {
      name: "Ongoing",
      count: challenges.filter((c) => c.status === "Ongoing").length,
      value: "Ongoing",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 md:py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Challenges
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track, manage, and complete challenges you&apos;ve joined
            </p>
          </div>
          <Link
            href="/challenges/explore"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Explore New Challenges
          </Link>
        </div>
      </header>

      <div className="space-y-8">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="w-full flex justify-start mb-6 border-b bg-transparent p-0 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-6 py-2 font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all duration-200 ease-in-out"
              >
                <span>{tab.name}</span>
                <Badge
                  variant="secondary"
                  className="ml-2 rounded-full px-2 py-0.5 text-xs font-normal"
                >
                  {tab.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {challenges.length <= 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Home className="w-6 h-6 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                No Challenges Found
              </h2>
              <p className="text-sm text-gray-500 max-w-md mb-6">
                You haven&apos;t participated in any challenges yet. Explore and
                join challenges to see them here.
              </p>
              <Link
                href="/dashboard"
                className={buttonVariants({ size: "lg" })}
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <>
              <TabsContent
                value="All"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300"
              >
                {challenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge.challenge}
                  />
                ))}
              </TabsContent>

              {["Completed", "Open", "Ongoing"].map((status) => {
                const filteredChallenges = challenges.filter(
                  (challenge) => challenge.status === status
                );

                return (
                  <TabsContent
                    key={status}
                    value={status}
                    className="animate-in fade-in duration-300"
                  >
                    {filteredChallenges.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <p className="text-sm text-gray-500 mb-4">
                          No {status.toLowerCase()} challenges found
                        </p>
                        <Link
                          href="/challenges/explore"
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                          })}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Explore New Challenges
                        </Link>
                      </div>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredChallenges.map((challenge) => (
                          <ChallengeCard
                            key={challenge.id}
                            challenge={challenge.challenge}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
