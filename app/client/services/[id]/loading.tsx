import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServiceDetailLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-10 w-3/4 mb-2" />
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-40" />
        </div>
        <Skeleton className="h-4 w-full max-w-3xl mb-1" />
        <Skeleton className="h-4 w-full max-w-3xl mb-1" />
        <Skeleton className="h-4 w-2/3 max-w-2xl" />
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="bg-emerald-50 border border-emerald-100">
          <TabsTrigger value="details" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Details
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
          >
            Requirements
          </TabsTrigger>
          <TabsTrigger value="process" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Process
          </TabsTrigger>
          <TabsTrigger value="apply" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Apply
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card className="bg-[hsl(var(--form-background))] border-[hsl(var(--form-border))]">
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-20 w-full rounded-lg" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
