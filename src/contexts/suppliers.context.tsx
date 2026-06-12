"use client";

import { createContext } from "react";
import { Suppliers } from "@/types/suppliers.type";

type SuppliersContextType = {
  suppliers?: Suppliers[];
  page: number;
  status: string;
  isLoading: boolean;
  error?: string;
};

export const SuppliersContext = createContext<SuppliersContextType | undefined>(
  undefined,
);
