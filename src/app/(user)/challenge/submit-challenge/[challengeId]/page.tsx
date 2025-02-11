import { SubmitChallengeForm } from "@/components/submit-challenge-form";

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  return <SubmitChallengeForm challengeId={(await params).challengeId} />;
}
