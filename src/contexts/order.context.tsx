"use client";

import { createContext } from "react";
import { Order } from "@/types/order.interface";

interface OrderContextValue {
  orders: Order[] | undefined;
  isLoading: boolean;
}

export const OrderContext = createContext<OrderContextValue | undefined>(
  undefined,
);
