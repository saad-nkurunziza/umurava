import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="rounded-lg border/40 p-8 space-y-6">
          <div>
            <Skeleton className="h-7 w-[300px] mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-[120px]" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-[80px]" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-[100px]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border/40">
          <div className="p-6">
            <Skeleton className="h-6 w-[100px] mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-[150px]" />
                </div>
              ))}
            </div>
          </div>
          <div className="border/40-t p-6">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="rounded-lg border/40">
          <div className="p-6">
            <div className="flex gap-4 items-center mb-4">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 w-[60px]" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-4 w-[80px] mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
