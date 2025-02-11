import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import CTABox from "@/components/landing/cta-box";

export default function CTA() {
  return (
    <CTABox>
      {" "}
      <div className="grid grid-cols-1 h-auto md:grid-cols-3 gap-8 md:gap-12 p-8 items-center z-10">
        <div className="relative aspect-square md:aspect-auto md:h-full">
          <Image
            src="/people-talking.png"
            fill
            alt="People talking"
            className="object-cover rounded h-auto"
          />
        </div>

        <div className="md:col-span-2 space-y-6 sm:pr-16">
          <h2 className="text-xl md:text-4xl font-bold text-primary-foreground leading-tight">
            Ready to Unlock Your Career Potential Today!
          </h2>

          <p className=" text-primary-foreground/80 leading-relaxed">
            Join a challenge or a hackathon to gain valuable work experience,
            build an impressive portfolio and increase your chances to land job
            opportunities and accelerate your career growth.
          </p>

          <Button
            size="lg"
            className="text-primary bg-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            View Challenge
          </Button>
        </div>
      </div>
    </CTABox>
  );
}
