import { Suppliers } from "@/types/suppliers.type";

export interface Expenses {
  expenseUuid: string;
  description: string;
  price: number;
  amount: number;
  date: string;
  suppliers: Suppliers | null;
  supplierUuid?: string | null;
}

export interface ExpensesPagination {
  expenses: Expenses[];
  maxPages: number;
}

export interface ExpensesCreate extends Omit<
  Expenses,
  "expenseUuid" | "suppliers" | "price"
> {
  price: string;
}
