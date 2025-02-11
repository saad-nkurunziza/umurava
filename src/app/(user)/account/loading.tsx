import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Profile Card Skeleton */}
      <div className="rounded-lg border border/40 p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-[70px]" />
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border/40 p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <Skeleton className="mt-2 h-4 w-[150px]" />
            <Skeleton className="mt-2 h-4 w-[120px]" />
          </div>
        ))}
      </div>

      {/* Recent Challenges Skeleton */}
      <div className="rounded-lg border border/40 p-6">
        <div className="space-y-4">
          <div>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="mt-2 h-4 w-[250px]" />
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border/40 rounded-lg"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-[200px]" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
              </div>
              <Skeleton className="h-6 w-[100px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
