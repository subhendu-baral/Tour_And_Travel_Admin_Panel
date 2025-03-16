import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfileEditSkeleton() {
  return (
    <div className="container mx-auto py-5">
          <Card className=" mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Name field skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Email field skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Roles field skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-1/4" />
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-sm" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}

