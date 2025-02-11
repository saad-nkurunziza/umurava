"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SubmitButtonProps extends ButtonProps {
  content?: string;
}

export function SubmitButton({
  className,
  variant,
  size,
  content = "Submit",
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {pending && <Loader2 className="animate-spin" />}
      {pending ? "Wait..." : content}
    </Button>
  );
}
