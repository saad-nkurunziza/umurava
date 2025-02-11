import React from "react";
import { Button } from "../ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  className = "",
}: FeatureCardProps) => {
  return (
    <div className={`p-8 bg-primary rounded-lg ${className}`}>
      <div className="flex flex-col gap-4">
        <Button size="icon" className="bg-background">
          {icon}
        </Button>
        <h3 className="text-2xl font-bold text-primary-foreground">{title}</h3>
        <p className="text-base text-primary-foreground/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
