import { ReactNode } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroAvatarImage({
  children,
  align,
}: {
  children: ReactNode;
  align: "left" | "right";
}) {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="relative overflow-hidden bg-primary py-2 rounded-2xl z-10"
    >
      {align === "left" ? (
        <div className="absolute -top-28 -right-16 w-48 h-48 border-[40px] border-background rounded-full " />
      ) : (
        <div className="absolute -top-28 -left-16 w-48 h-48  border-[40px] border-background rounded-full " />
      )}

      {children}
    </AspectRatio>
  );
}
