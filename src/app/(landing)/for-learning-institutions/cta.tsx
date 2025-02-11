import React from "react";
import { Button } from "@/components/ui/button";
import CTABox from "@/components/landing/cta-box";

const CTA = () => {
  return (
    <CTABox>
      <div className="flex flex-col gap-8 py-6 justify-center items-center max-w-[40%] mx-auto z-10">
        <h2 className="text-xl sm:text-3xl font-bold text-center text-primary-foreground">
          Ready to transform your learning institution?
        </h2>
        <Button
          size="lg"
          className="text-primary bg-primary-foreground hover:bg-primary-foreground hover:text-primary"
        >
          Let&apos;s Partner
        </Button>
      </div>
    </CTABox>
  );
};

export default CTA;
