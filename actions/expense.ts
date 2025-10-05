"use server";

import { Expense } from "@/types";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// GET all expenses
export async function getExpenses(): Promise<Expense[]> {
  const data = await sql`SELECT * FROM expenses ORDER BY date DESC`;
  return data as Expense[];
}

// GET one expense by id
export async function getExpenseById(id: number): Promise<Expense | null> {
  const data = await sql`SELECT * FROM expenses WHERE id=${id}`;
  const [expense] = data as Expense[];
  return expense || null;
}

// CREATE expense
export async function createExpense(expense: Omit<Expense, "id">): Promise<Expense> {
  const data = await sql`
    INSERT INTO expenses (amount, category, description, date)
    VALUES (${expense.amount}, ${expense.category}, ${expense.description}, ${expense.date})
    RETURNING *
  `;
  const [newExpense] = data as Expense[];
  return newExpense;
}

// UPDATE expense
export async function updateExpense(id: number, expense: Expense): Promise<Expense> {
  const data = await sql`
    UPDATE expenses
    SET amount=${expense.amount},
        category=${expense.category},
        description=${expense.description},
        date=${expense.date}
    WHERE id=${id}
    RETURNING *
  `;
  const [updated] = data as Expense[];
  return updated;
}

// DELETE expense
export async function deleteExpense(id: number): Promise<{ success: boolean }> {
  await sql`DELETE FROM expenses WHERE id=${id}`;
  return { success: true };
}
