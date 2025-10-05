import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonChartProps {
  title: string
  description: string
}

export function SkeletonChart({ title, description }: SkeletonChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-end justify-between gap-2 px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 60 + 40}%` }} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
