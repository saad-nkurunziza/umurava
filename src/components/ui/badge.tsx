import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
        blue: "bg-blue-50 text-blue-500 border-blue-100 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
        amber:
          "bg-amber-50 text-amber-500 border-amber-100 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
        red: "bg-red-50 text-red-500 border-red-100 dark:bg-red-950 dark:text-red-200 dark:border-red-800",
        green:
          "bg-green-50 text-green-500 border-green-100 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
        gray: "bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-800",
        indigo:
          "bg-indigo-50 text-indigo-500 border-indigo-100 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-800",
        pink: "bg-pink-50 text-pink-500 border-pink-100 dark:bg-pink-950 dark:text-pink-200 dark:border-pink-800",
        purple:
          "bg-purple-50 text-purple-500 border-purple-100 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800",
        teal: "bg-teal-50 text-teal-500 border-teal-100 dark:bg-teal-950 dark:text-teal-200 dark:border-teal-800",
        yellow:
          "bg-yellow-50 text-yellow-500 border-yellow-100 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
        violet:
          "bg-violet-50 text-violet-500 border-violet-100 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
