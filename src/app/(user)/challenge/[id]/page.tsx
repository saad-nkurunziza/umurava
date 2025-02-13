import { Clock, Award, Briefcase, Home, Trash, Edit } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import InfoItem from "@/components/info-item";
import TaskList from "@/components/task-list";
import {
  checkIfJoined,
  getChallengeById,
  joinChallenge,
  deleteChallenge,
  leaveChallenge,
  removeUserFromChallenge,
} from "@/lib/actions/challenges";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NoPage from "@/components/not-found";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { ScrollArea } from "@/components/ui/scroll-area";
import { checkIfSubmission } from "@/lib/actions/submissions";
import { SubmitButton } from "@/components/submit-button";
import { getStaticChallenges } from "@/lib/actions/static-fetches";

export async function generateStaticParams() {
  const res = await getStaticChallenges();
  return res.data
    ? res.data.map((challenge) => ({
        id: String(challenge.id),
      }))
    : [];
}

export default async function ChallengeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const id = (await params).id;
  const res = await getChallengeById(id);

  if (!res || res.error || !res.data) {
    return (
      <NoPage>
        <h2 className="text-xl font-semibold mb-2">Oops! Page Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The page you&apos;re looking for doesn&apos;t seem to exist.
        </p>
        <Link
          href="/explore"
          className={buttonVariants({ variant: "default" })}
        >
          {" "}
          <Home className="w-4 h-4 mr-2" />
          Go to Challenges
        </Link>
      </NoPage>
    );
  }
  const challenge = res.data;
  const { data: isJoinedData, error: joinedError } = await checkIfJoined(id);
  const { data: isSubmittedData, error: submittedError } =
    await checkIfSubmission(id);
  if (joinedError || !isJoinedData || submittedError || !isSubmittedData) {
    return (
      <NoPage>
        <h2 className="text-xl font-semibold mb-2">Oops! Page Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Failed to fetch challenge data. Please try again later.
        </p>
      </NoPage>
    );
  }

  const isJoined = isJoinedData.isJoined;
  const isSubmitted = isSubmittedData.isSubmitted;

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <h1 className="text-lg font-semibold mb-4">
                  {challenge.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {challenge.projectDescription}
                </p>
              </div>
              <Separator />

              <TaskList title={"Requirements"} tasks={challenge.requirements} />
              <TaskList title={"Skills"} tasks={challenge.skills} />
              {isJoined &&
                (isSubmitted ? (
                  <Button variant="outline" className="mt-8" disabled>
                    Challenge submitted
                  </Button>
                ) : (
                  <Link
                    href={`/challenge/submit-challenge/${challenge.id}`}
                    className={`${buttonVariants({ variant: "default" })} mt-8`}
                  >
                    Submit challenge
                  </Link>
                ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 text-sm">
          <Card>
            <CardHeader>
              <h2 className="font-medium">Key Info</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem
                icon={Briefcase}
                label="Challenge Category"
                value={challenge.skills[0]}
              />
              <InfoItem
                icon={Clock}
                label="Start data"
                value={`${format(new Date(challenge.startDate), "dd-MM-yyyy")}`}
              />
              <InfoItem
                icon={Clock}
                label="End data"
                value={`${format(new Date(challenge.endDate), "dd-MM-yyyy")}`}
              />
              <InfoItem
                icon={Award}
                label="Money Prize"
                value={`$${challenge.prize}`}
              />
            </CardContent>
            <CardFooter className="flex gap-4">
              {/* Admin Controls */}
              {session.user.role === "ADMIN" ? (
                <>
                  {/* Delete Challenge Dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                      >
                        <Trash className="size-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this challenge?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the challenge and all related data from the
                          database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <form
                            action={async () => {
                              "use server";
                              await deleteChallenge(challenge.id);
                            }}
                          >
                            <Button type="submit" className="flex-1">
                              Yeah
                            </Button>
                          </form>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button asChild size="sm" className="flex-1">
                    <Link href={`/challenge/edit/${challenge.id}`}>
                      <Edit className="size-4" />
                      Edit
                    </Link>
                  </Button>
                </>
              ) : (
                /* User Controls */
                <>
                  {isJoined && !isSubmitted ? (
                    /* Leave Challenge Button */
                    <form
                      action={async () => {
                        "use server";
                        const result = await leaveChallenge(challenge.id);
                        if (result.data) {
                          revalidatePath(`/challenge/${challenge.id}`);
                        } else {
                          console.error(result);
                        }
                      }}
                    >
                      <SubmitButton content="Leave" className="flex-1" />
                    </form>
                  ) : !isJoined && !isSubmitted ? (
                    /* Join Challenge Button */
                    <form
                      action={async () => {
                        "use server";
                        const result = await joinChallenge(challenge.id);
                        if (result.data) {
                          revalidatePath(`/challenge/${challenge.id}`);
                        } else {
                          console.error(result);
                        }
                      }}
                    >
                      <SubmitButton content="Join" className="flex-1" />
                    </form>
                  ) : isJoined && isSubmitted ? (
                    /* Challenge Submitted Status */
                    <Button type="submit" className="flex-1">
                      Challenge Submitted
                    </Button>
                  ) : null}
                </>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex">
              <div className="flex gap-4 items-center">
                <h2 className="font-medium">Participants</h2>
                <Badge variant={"outline"}>
                  {challenge.participants.length}/{challenge.maxParticipants}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenge.participants.slice(0, 4).map((participant, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between relative"
                >
                  <Link
                    href={`/account/${participant.id}`}
                    className="absolute inset-0 sr-only"
                  >
                    TO account
                  </Link>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={participant.user.image || "/gg.png"} />
                      <AvatarFallback>
                        {(participant.user.name ?? "").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{participant.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {participant.user.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            {session.user.role === "ADMIN" &&
              challenge.participants.length > 0 && (
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="w-full">
                        View All
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=" mb-6">
                          Participants
                        </DialogTitle>
                        <ScrollArea className="h-[55vh]">
                          <div className="flex flex-col gap-4">
                            {challenge.participants.map((item) => {
                              return (
                                <div
                                  className="flex justify-between gap-8"
                                  key={item.id}
                                >
                                  <Link
                                    href={`/account/${item.user.id}`}
                                    className="flex flex-col gap-1"
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage
                                          src={item.user.image || "/gg.png"}
                                        />
                                        <AvatarFallback>
                                          {(item.user.name ?? "").charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">
                                          {item.user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {item.user.email}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                  <form
                                    action={async () => {
                                      "use server";
                                      const result =
                                        await removeUserFromChallenge(
                                          challenge.id,
                                          item.user.id
                                        );
                                      if (result.data) {
                                        revalidatePath(
                                          `/challenge/${challenge.id}`
                                        );
                                        revalidatePath(
                                          `/account/${item.user.id}`
                                        );
                                      } else {
                                        console.error(result);
                                      }
                                    }}
                                  >
                                    <SubmitButton
                                      content="Remove"
                                      className="flex-1"
                                    />
                                  </form>
                                </div>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              )}
          </Card>
        </div>
      </div>
    </div>
  );
}
