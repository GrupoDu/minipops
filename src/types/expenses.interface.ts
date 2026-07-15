import { Supplier } from "@/types/suppliers.interface";

export interface Expenses {
  expenseUuid: string;
  description: string;
  price: number;
  amount: number;
  date: string;
  supplier: Supplier | null;
  supplierUuid?: string | null;
}

export interface ExpensesPagination {
  expenses: Expenses[];
  maxPages: number;
}

export interface ExpensesCreate extends Omit<
  Expenses,
  "expenseUuid" | "supplier" | "price"
> {
  price: string;
}
