import { Supplier } from "@/types/suppliers.interface";

export interface Expenses {
  uuid: string;
  description: string;
  price: number;
  amount: number;
  date: string;
  supplier: Supplier | null;
  supplierUuid?: string | null;
}

export interface ExpensesCreate extends Omit<Expenses, "uuid" | "supplier"> {}
