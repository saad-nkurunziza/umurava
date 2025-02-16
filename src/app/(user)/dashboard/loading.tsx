import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen space-y-8">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[150px] mt-4 sm:mt-0" />
      </div>

      <div className="mb-12 grid gap-6 grid-cols-2 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border-border/40 rounded-lg">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-6 w-[60px]" />
            </div>
            <Skeleton className="mt-2 h-4 w-[80px]" />
          </div>
        ))}
      </div>

      <div className="mb-12">
        <div className="border-border/40 p-6 rounded-lg">
          <Skeleton className="h-6 w-[180px] mb-6" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-border/40 rounded-lg p-6">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex gap-2 mb-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-16" />
                ))}
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
