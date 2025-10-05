"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { AddExpenseDialog } from "./add-expense-dialog";
import { Expense } from "@/types";
import { createExpense } from "@/actions/expense";
import { useRouter } from "next/navigation";

const ExpenseDialog = () => {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddExpense = async (expense: Omit<Expense, "id">) => {
    await createExpense(expense)
    router.refresh()
    setIsDialogOpen(false);
  };
  return (
    <div>
      <AddExpenseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddExpense={handleAddExpense}
      />
      <Button onClick={() => setIsDialogOpen(true)} size="lg" className="gap-2">
        <PlusCircle className="h-5 w-5" />
        Add Expense
      </Button>
    </div>
  );
};

export default ExpenseDialog;
