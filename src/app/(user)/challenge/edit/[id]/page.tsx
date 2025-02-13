import { getEditChallengeById } from "@/lib/actions/challenges";
import React from "react";
import NoPage from "@/components/not-found";
import { EditChallengeForm } from "@/components/edit-challenge-form";
import BackButton from "@/components/back-button";
import { getStaticChallenges } from "@/lib/actions/static-fetches";

export async function generateStaticParams() {
  const res = await getStaticChallenges();
  return res.data
    ? res.data.map((challenge) => ({
        id: String(challenge.id),
      }))
    : [];
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const challenge = await getEditChallengeById((await params).id);
  if (!challenge || challenge.error || !challenge.data) {
    return (
      <NoPage>
        <h2 className="text-xl font-semibold mb-2">
          Oops! Challenge Not Found
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          The data you&apos;re looking for doesn&apos;t seem to exist.
        </p>
        <BackButton />
      </NoPage>
    );
  }
  return (
    <div>
      <EditChallengeForm
        challenge={challenge.data}
        challengeId={challenge.data.id}
      />
    </div>
  );
};

export default page;
