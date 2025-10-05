"use server";

import { Expense } from "@/types";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);


// GET all expenses
export async function getExpenses(): Promise<Expense[]> {
  const data = await sql<Expense[]>`SELECT * FROM expenses ORDER BY date DESC`;
  return data;
}

// GET one expense by id
export async function getExpenseById(id: number): Promise<Expense | null> {
  const [expense] = await sql<Expense[]>`SELECT * FROM expenses WHERE id=${id}`;
  return expense || null;
}

// CREATE expense
export async function createExpense(expense: Expense): Promise<Expense> {
  const [newExpense] = await sql<Expense[]>`
    INSERT INTO expenses (amount, category, description, date)
    VALUES (${expense.amount}, ${expense.category}, ${expense.description}, ${expense.date})
    RETURNING *
  `;
  return newExpense;
}

// UPDATE expense
export async function updateExpense(id: number, expense: Expense): Promise<Expense> {
  const [updated] = await sql<Expense[]>`
    UPDATE expenses
    SET amount=${expense.amount},
        category=${expense.category},
        description=${expense.description},
        date=${expense.date}
    WHERE id=${id}
    RETURNING *
  `;
  return updated;
}

// DELETE expense
export async function deleteExpense(id: number): Promise<{ success: boolean }> {
  await sql`DELETE FROM expenses WHERE id=${id}`;
  return { success: true };
}
