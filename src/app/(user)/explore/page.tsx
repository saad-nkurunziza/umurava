import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChallengeCard from "@/components/challenge-card";
import { getChallenges, getPopularChallenges } from "@/lib/actions/challenges";
import { Home } from "lucide-react";
import NoPage from "@/components/not-found";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Challenges() {
  const res = await getChallenges();
  const requestPopularChallenges = await getPopularChallenges();

  if (!res || res.error || !res.data) {
    return <div>Failed to fetch challenges</div>;
  }
  const challenges = res.data;
  const { data: popularChallenges } = requestPopularChallenges;
  const tabs = [
    { name: "All Challenges", count: challenges.length, value: "All" },
    {
      name: "Open",
      count: challenges.filter((c) => c.status === "Open").length,
      value: "Open",
    },
    {
      name: "Popular",
      count: popularChallenges?.length ?? 0,
      value: "Popular",
    },
    {
      name: "Canceled",
      count: challenges.filter((c) => c.status === "Canceled").length,
      value: "Canceled",
    },
    {
      name: "Closed",
      count: challenges.filter((c) => c.status === "Closed").length,
      value: "Closed",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 md:py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Explore Challengess
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse and discover available challenges from the community
            </p>
          </div>
        </div>
      </header>
      <div className="space-y-8">
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="h-10 items-center justify-start rounded-none border-b bg-transparent p-0">
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
            <div className="mt-2">
              <TabsContent
                value={"All"}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {challenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </TabsContent>
              <TabsContent
                value={"Open"}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {challenges
                  .filter((c) => c.status === "Open")
                  .map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
              </TabsContent>
              <TabsContent
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                value={"Popular"}
              >
                {popularChallenges?.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </TabsContent>
              {["Canceled", "Closed"].map((status) => (
                <TabsContent
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  key={status}
                  value={status}
                >
                  {challenges
                    .filter((challenge) => challenge.status === status)
                    .map((challenge) => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
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
