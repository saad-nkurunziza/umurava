import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/landing/challenge-card";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex-1">
      <section>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" className="p-0.5">
              <ChevronLeft className="w-2 h-2" />
            </Button>
            <div className="flex gap-2 item-center text-sm font-medium">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>{" "}
              /<span className="">Challenges & Hackathons</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <ChallengeCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
