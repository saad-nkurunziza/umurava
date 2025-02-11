import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChallengeCard from "@/components/challenge-card";
import { getChallengesParticipatedByUser } from "@/lib/actions/challenges";
import { Home } from "lucide-react";
import NoPage from "@/components/not-found";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function YourChallengesPage() {
  const res = await getChallengesParticipatedByUser();

  if (!res || res.error || !res.data) {
    return <div>Failed to fetch challenges</div>;
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
    <div className="min-h-screen">
      <div className="space-y-8">
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="h-10 overflow-x-scroll rounded-none border-b bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
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
            <NoPage>
              <h2 className="text-xl font-semibold mb-2">
                Oops! No Challenges Found
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                It seems no challenges added yet.
              </p>
              <Link
                href={`/dashboard`}
                className={`${buttonVariants({ variant: "default" })} mt-8`}
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Link>
            </NoPage>
          ) : (
            <div className="">
              <TabsContent
                value={"All"}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {challenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge.challenge}
                  />
                ))}
              </TabsContent>
              {["Completed", "Open", "Ongoing"].map((status) => (
                <TabsContent
                  key={status}
                  value={status}
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {challenges
                    .filter((challenge) => challenge.status === status)
                    .map((challenge) => (
                      <ChallengeCard
                        key={challenge.id}
                        challenge={challenge.challenge}
                      />
                    ))}
                </TabsContent>
              ))}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
