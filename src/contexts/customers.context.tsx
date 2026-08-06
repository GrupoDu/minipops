"use client";

import { createContext } from "react";
import { Customer } from "@/types/customer.interface";

interface CustomersContextProps {
  customers: Customer[] | undefined;
  status: string | undefined;
  error: string | undefined;
}

export const CustomersContext = createContext<
  CustomersContextProps | undefined
>(undefined);
