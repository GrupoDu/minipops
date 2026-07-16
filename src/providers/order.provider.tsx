"use client";

import { ReactNode, useMemo } from "react";
import { OrderContext } from "@/contexts/order.context";
import useFetch from "@/hooks/useFetch";
import { Order } from "@/types/order.interface";

function OrderProvider({ children }: { children: ReactNode }) {
  const { data, status, isLoading, error } = useFetch<Order[]>("/order");

  const orders = useMemo(() => {
    return {
      orders: data,
      status,
      isLoading,
      error,
    };
  }, [data, error, isLoading, status]);

  return (
    <OrderContext.Provider value={orders}>{children}</OrderContext.Provider>
  );
}

export default OrderProvider;
