import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  divClassName?: string;
  text: string;
  active?: boolean;
}

export const SkillCard = ({
  className,
  divClassName,
  text,
  active = false,
}: Props) => {
  return (
    <div
      className={cn(
        "inline-flex flex-[0_0_auto] items-center justify-center gap-2.5 px-4 py-2 relative rounded-lg",
        {
          "bg-primary": active,
          "bg-muted": !active,
        },
        className
      )}
    >
      <div
        className={cn(
          "relative font-normal text-sm whitespace-nowrap",
          {
            "text-primary-foreground": active,
            "text-muted-foreground": !active,
          },
          divClassName
        )}
      >
        {text}
      </div>
    </div>
  );
};
