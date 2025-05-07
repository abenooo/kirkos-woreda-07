import { Skeleton } from "@/components/ui/skeleton"

export default function ClientLoading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
