import { SkeletonCard } from "@/components/ui/skeliton-card";

export default function page() {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
    </div>
  )
}
