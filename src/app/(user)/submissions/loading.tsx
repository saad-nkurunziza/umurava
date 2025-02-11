import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border/40">
        <div className="border-b px-4 py-3">
          <Skeleton className="h-8 w-[200px]" />
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-4 flex items-center justify-between border-b"
          >
            <div className="flex gap-4">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-[100px]" />
          </div>
        ))}

        <div className="p-4 flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[300px]" />
        </div>
      </div>
    </div>
  );
}
