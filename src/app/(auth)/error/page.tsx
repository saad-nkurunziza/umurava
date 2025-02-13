import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthError() {
  return (
    <div className="p-12 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-lg">
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-red-600">Authentication Error</h1>
        <p className="text-muted-foreground">
          An error occurred during authentication. Please try again.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="secondary">
            <Link href="/login">Go back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
