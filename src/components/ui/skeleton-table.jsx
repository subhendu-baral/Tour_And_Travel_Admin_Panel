import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 py-4 border-b">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-6 w-full" />
        ))}
      </div>

      {/* Table Rows */}
      {[...Array(10)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-4 py-4 border-b">
          {[...Array(4)].map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-6 w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}
