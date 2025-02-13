import { SubmitChallengeForm } from "@/components/submit-challenge-form";
import { getStaticChallenges } from "@/lib/actions/static-fetches";

export async function generateStaticParams() {
  const res = await getStaticChallenges();
  return res.data
    ? res.data.map((challenge) => ({
        challengeId: String(challenge.id),
      }))
    : [];
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  return <SubmitChallengeForm challengeId={(await params).challengeId} />;
}
