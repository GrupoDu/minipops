"use client";

import { createContext } from "react";
import { Order } from "@/types/order.interface";

interface OrderContextValue {
  orders: Order[] | undefined;
  status: string;
  isLoading: boolean;
  error?: string;
}

export const OrderContext = createContext<OrderContextValue | undefined>(
  undefined,
);
