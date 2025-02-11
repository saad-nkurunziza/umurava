import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthError() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-4">
          An error occurred during authentication. Please try again.
        </p>
        <div className="flex gap-4">
          <Button className="">Try again</Button>
          <Link
            href="/login"
            className="px-4 py-2 bg-gray-50 dark:bg-neutral-9000 text-white rounded hover:bg-gray-600"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
