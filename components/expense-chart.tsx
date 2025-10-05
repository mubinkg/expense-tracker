"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import type { Expense } from "./expense-dashboard"

interface ExpenseChartProps {
  expenses: Expense[]
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Group expenses by date and calculate cumulative total
  const chartData = expenses
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((acc: { date: string; amount: number; cumulative: number }[], expense) => {
      const existingDate = acc.find((item) => item.date === expense.date)
      const previousCumulative = acc.length > 0 ? acc[acc.length - 1].cumulative : 0

      if (existingDate) {
        existingDate.amount += expense.amount
        existingDate.cumulative += expense.amount
      } else {
        acc.push({
          date: new Date(expense.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          amount: expense.amount,
          cumulative: previousCumulative + expense.amount,
        })
      }
      return acc
    }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
        <CardDescription>Your cumulative expenses over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            cumulative: {
              label: "Cumulative Spending",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCumulative)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
