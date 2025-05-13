import { Skeleton } from "@/components/ui/skeleton"

export default function ComplaintsLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[600px] w-full rounded-lg" />
    </div>
  )
}
