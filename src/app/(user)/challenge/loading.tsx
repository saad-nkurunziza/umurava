import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto rounded-lg border-border/40 p-6">
      <div className="space-y-8">
        <Skeleton className="h-8 w-[200px]" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-32 w-full" />
          </div>

          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-10 w-[200px] mt-8" />
        </div>
      </div>
    </div>
  );
}
