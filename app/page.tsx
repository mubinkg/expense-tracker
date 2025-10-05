import { ExpenseDashboard } from "@/components/expense-dashboard"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
     <Suspense fallback="loading....">
       <ExpenseDashboard />
     </Suspense>
    </main>
  )
}
