import {
  getCurrentUser,
  getUserStats,
  getUserChallenges,
  getAdminStats,
} from "@/lib/actions/user";
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
  LockIcon,
  XCircleIcon,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { UserChallengeStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AccountPage() {
  const session = await auth();
  const currentUserDataFn = getCurrentUser();
  const adminStatsDataFn = getAdminStats();

  const [currentUserData, adminStatsData] = await Promise.all([
    currentUserDataFn,
    adminStatsDataFn,
  ]);
  const { data: extendedUser } = currentUserData;

  const { data: adminServerStats } = adminStatsData;
  if (!session || !session.user || !extendedUser) {
    redirect("/login");
  }

  const user = session.user;

  const { data: stats } = await getUserStats(user.id!);
  const { data: challenges } = await getUserChallenges(user.id!);

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

  const adminStats = [
    {
      icon: <TrophyIcon className="w-4 h-4 text-green-500" />,
      value: adminServerStats?.completed || 0,
      label: "Completed Challenges",
      description: `${adminServerStats?.completed || 0}/${
        adminServerStats?.totalStats
      } challenges finished`,
    },
    {
      icon: <ClockIcon className="w-4 h-4 text-yellow-500" />,
      value: adminServerStats?.ongoing || 0,
      label: "Ongoing Challenges",
      description: `Challenges in progress`,
    },
    {
      icon: <CalendarIcon className="w-4 h-4 text-blue-500" />,
      value: adminServerStats?.postponed || 0,
      label: "Postponed Challenges",
      description: `${adminServerStats?.postponed || 0} delayed`,
    },
    {
      icon: <LockIcon className="w-4 h-4 text-purple-500" />,
      value: adminServerStats?.open || 0,
      label: "Open Challenges",
      description: "Ready for participants",
    },
    {
      icon: <XCircleIcon className="w-4 h-4 text-orange-500" />,
      value: adminServerStats?.canceled || 0,
      label: "Canceled Challenges",
      description: "Discontinued early",
    },
    {
      icon: <DollarSignIcon className="w-4 h-4 text-red-500" />,
      value: adminServerStats?.totalPaid || 0,
      label: "Total Payments",
      description: "Cumulative disbursements",
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
                {formatDistance(new Date(extendedUser.createdAt), new Date(), {
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
                Member since{" "}
                {new Date(extendedUser.createdAt).toLocaleDateString()}
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
      {user.role === "ADMIN" && (
        <div className="grid gap-4 md:grid-cols-3">
          {adminStats.map((stat, index) => (
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
}
