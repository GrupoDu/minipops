import { Suppliers } from "@/types/suppliers.type";

export interface Expenses {
  expense_uuid: string;
  description: string;
  price: number;
  amount: number;
  date: string;
  suppliers: Suppliers | null;
  supplier_uuid?: string | null;
}

export interface ExpensesPagination {
  expenses: Expenses[];
  max_pages: number;
}

export interface ExpensesCreate extends Omit<
  Expenses,
  "expense_uuid" | "suppliers" | "price"
> {
  price: string;
}
