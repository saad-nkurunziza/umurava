import React from "react";
import SectionTitle from "../../components/landing/section-title";
import { Card } from "@/components/ui/card";

export default function HowToGetStarted() {
  return (
    <section>
      <SectionTitle
        title="How to Get Started"
        subtitle="Join our community of digital professionals and start your journey today"
      />

      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="space-y-8 flex flex-col">
          <StepBox
            stepNumber={1}
            title="Sign Up"
            description="Create your account and complete your profile"
            className="flex-1"
          />
          <StepBox
            stepNumber={2}
            title="Choose Challenge"
            description="Browse and select from available skill challenges"
            className="flex-1"
          />
        </div>

        <div className="space-y-8">
          <StepBox
            stepNumber={3}
            title="Get Started"
            description="Begin working on your challenge and showcase your skills"
          />
          <StepBox
            stepNumber={4}
            title="Track Progress"
            description="Monitor your progress and improve your skills"
          />
          <StepBox
            stepNumber={5}
            title="Achieve Goals"
            description="Complete challenges and achieve your goals"
          />
        </div>
      </div>
    </section>
  );
}

interface StepBoxProps {
  stepNumber: number;
  title: string;
  description: string;
  className?: string;
}

export const StepBox: React.FC<StepBoxProps> = ({
  stepNumber,
  title,
  description,
  className,
}) => {
  return (
    <Card className={` p-6 ${className}`}>
      <div className="px-1.5 py-0.5 bg-primary rounded w-fit flex items-center gap-1 text-xs text-primary-foreground justify-center mb-4">
        <span>Step</span> <span>{stepNumber}</span>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-base text-muted-foreground">{description}</p>
    </Card>
  );
};
