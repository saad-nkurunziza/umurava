import NoPage from "@/components/not-found";
import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <NoPage>
      <h2 className="text-xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-sm text-muted-foreground mb-6">
        The page you&apos;re looking for doesn&apos;t seem to exist.
      </p>
      <Link
        href={`/dashboard`}
        className={`${buttonVariants({ variant: "default" })} mt-8`}
      >
        <Home className="w-4 h-4 mr-2" />
        Go Home
      </Link>
    </NoPage>
  );
}
