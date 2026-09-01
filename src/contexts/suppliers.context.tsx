"use client";

import { createContext } from "react";
import { Supplier } from "@/types/suppliers.interface";

type SuppliersContextType = {
  suppliers?: Supplier[];
  page: number;
  isLoading: boolean;
};

export const SuppliersContext = createContext<SuppliersContextType | undefined>(
  undefined,
);
