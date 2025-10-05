import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseChart } from "@/components/expense-chart"
import { CategoryChart } from "@/components/category-chart"
import { TrendingDown, TrendingUp, Wallet, CreditCard, PlusCircle } from "lucide-react"
import { Expense } from "@/types"
import ExpenseDialog from "./expense-dialog"

const expenses: Expense[] = [
  { id: "1", amount: 1250, category: "Housing", description: "Rent", date: "2025-10-01" },
  { id: "2", amount: 450, category: "Food", description: "Groceries", date: "2025-10-02" },
  { id: "3", amount: 80, category: "Transportation", description: "Gas", date: "2025-10-03" },
  { id: "4", amount: 120, category: "Entertainment", description: "Movie & Dinner", date: "2025-10-04" },
  { id: "5", amount: 200, category: "Utilities", description: "Electric Bill", date: "2025-10-05" },
  { id: "6", amount: 350, category: "Food", description: "Restaurants", date: "2025-10-08" },
  { id: "7", amount: 90, category: "Transportation", description: "Uber", date: "2025-10-10" },
  { id: "8", amount: 500, category: "Shopping", description: "Clothing", date: "2025-10-12" },
  { id: "9", amount: 150, category: "Healthcare", description: "Pharmacy", date: "2025-10-15" },
  { id: "10", amount: 75, category: "Entertainment", description: "Concert", date: "2025-10-18" },
]

export function ExpenseDashboard() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const avgExpense = totalExpenses / expenses.length
  const thisMonthExpenses = expenses.filter((e) => e.date.startsWith("2025-10")).length

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">Monitor your spending and stay on budget</p>
        </div>
        <ExpenseDialog/>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="inline-flex items-center gap-1 text-destructive">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgExpense.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="inline-flex items-center gap-1 text-chart-2">
                <TrendingDown className="h-3 w-3" />
                -3.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthExpenses}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground mt-1">$1,100 remaining</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <ExpenseChart expenses={expenses} />
        <CategoryChart expenses={expenses} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest expense entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses
              .slice(-5)
              .reverse()
              .map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-destructive">-${expense.amount.toFixed(2)}</div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
