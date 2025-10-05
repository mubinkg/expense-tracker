"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { AddExpenseDialog } from "./add-expense-dialog";
import { Expense } from "@/types";

const ExpenseDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
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
