import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
  aside?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  aside = false,
}) => {
  return (
    <section className="mb-12 px-0">
      <div
        className={cn(
          "max-w-2xl",
          aside ? "text-start mx-0" : "text-center mx-auto"
        )}
      >
        <h2 className="text-xl sm:text-4xl font-bold mb-4">{title}</h2>
        <p
          className={cn(
            "sm:text-lg text-muted-foreground max-w-2xl",
            aside ? "ml-0" : "mx-auto"
          )}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default SectionTitle;

interface SectionTitleOnlyProps {
  title: string;
  align?: "start" | "center";
}
export const SimpleTitle: React.FC<SectionTitleOnlyProps> = ({
  title,
  align = "center",
}) => {
  return (
    <section className="mb-12">
      <div
        className={cn(
          "",
          align === "center"
            ? "max-w-4xl text-center mx-auto"
            : "text-left mx-0"
        )}
      >
        <h2 className="text-xl sm:text-4xl font-bold mb-4">{title}</h2>
      </div>
    </section>
  );
};
