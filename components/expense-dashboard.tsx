import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseChart } from "@/components/expense-chart"
import { CategoryChart } from "@/components/category-chart"
import { TrendingDown, TrendingUp, Wallet, CreditCard } from "lucide-react"
import ExpenseDialog from "./expense-dialog"
import { getExpenses } from "@/actions/expense"

export async function ExpenseDashboard() {
  const expenses = await getExpenses()
  const totalExpenses = expenses.reduce((sum, expense) => sum + parseInt(expense.amount), 0)
  const avgExpense = totalExpenses / expenses.length

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">Monitor your spending and stay on budget</p>
        </div>
        <ExpenseDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{totalExpenses.toFixed(2)}</div>
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
            <div className="text-2xl font-bold">৳{avgExpense.toFixed(2)}</div>
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
            {/* <div className="text-2xl font-bold">{thisMonthExpenses}</div> */}
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
            <p className="text-xs text-muted-foreground mt-1">৳1,100 remaining</p>
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
                  <div className="text-lg font-semibold text-destructive">৳{parseInt(expense.amount).toFixed(2)}</div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
