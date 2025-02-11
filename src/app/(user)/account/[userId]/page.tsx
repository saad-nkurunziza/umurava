import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  TrophyIcon,
  ClockIcon,
  DollarSignIcon,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { UserChallengeStatus } from "@prisma/client";
import {
  getUserStats,
  getUserChallenges,
  getUserById,
} from "@/lib/actions/user";
import NoPage from "@/components/not-found";
import { auth } from "@/lib/auth";
import BackButton from "@/components/back-button";

const AccountAnyUserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;
  const session = await auth();
  const { data: user } = await getUserById(userId);
  const { data: stats } = await getUserStats(userId);
  const { data: challenges } = await getUserChallenges(userId);

  if (!user) return null;
  if (user.role === "ADMIN" && session?.user.role !== "ADMIN") {
    return (
      <NoPage>
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-sm text-muted-foreground mb-6">
          You don&apos;t have permission to view this admin profile.
        </p>
        <BackButton />
      </NoPage>
    );
  }
  const userStats = [
    {
      icon: <TrophyIcon className="w-4 h-4 text-green-500" />,
      value: stats?.completed || 0,
      label: "Completed Challenges",
      description: `Success Rate: ${(
        ((stats?.completed || 0) / (stats?.ongoing || 1)) *
        100
      ).toFixed(1)}%`,
    },
    {
      icon: <ClockIcon className="w-4 h-4 text-yellow-500" />,
      value: stats?.ongoing || 0,
      label: "Ongoing Challenges",
      description: "Active Participation",
    },
    {
      icon: <DollarSignIcon className="w-4 h-4 text-blue-500" />,
      value: `$${stats?.earnings || 0}`,
      label: "Total Earnings",
      description: `Average: $${(
        (stats?.earnings || 0) / (stats?.completed || 1)
      ).toFixed(2)}/challenge`,
    },
  ];
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex gap-2">
              <Badge variant="outline">{user.role}</Badge>
              <Badge variant="secondary">
                Joined{" "}
                {formatDistance(new Date(user.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mt-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span>
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {user.role === "USER" && (
        <div className="grid gap-4 md:grid-cols-3">
          {userStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  {stat.icon}
                  <div className="text-lg font-semibold">{stat.value}</div>
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
                <CardDescription className="mt-2">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Recent Challenges
          </CardTitle>
          <CardDescription>Your latest challenge activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges?.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <p>Prize: ${challenge.prize}</p>
                    <p>
                      Started:{" "}
                      {formatDistance(
                        new Date(challenge.startDate),
                        new Date(),
                        { addSuffix: true }
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      challenge.participants[0]?.status ===
                      UserChallengeStatus.Completed
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {challenge.participants[0]?.status}
                  </Badge>
                </div>
              </div>
            ))}
            {!challenges?.length && (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-lg">No challenges joined yet.</p>
                <p className="text-sm">
                  Start participating in challenges to build your portfolio!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountAnyUserPage;
