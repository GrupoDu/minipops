"use client";

import { createContext } from "react";
import { Supplier } from "@/types/suppliers.interface";

type SuppliersContextType = {
  suppliers?: Supplier[];
  page: number;
  status: string;
  isLoading: boolean;
  error?: string;
};

export const SuppliersContext = createContext<SuppliersContextType | undefined>(
  undefined,
);
