import AppSkeleton from "@/components/app-skeleton"
import { ExpenseDashboard } from "@/components/expense-dashboard"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
     <Suspense fallback={<AppSkeleton/>}>
       <ExpenseDashboard />
     </Suspense>
    </main>
  )
}
