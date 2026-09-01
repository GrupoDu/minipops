"use client";

import { ReactNode, useMemo } from "react";
import { OrderContext } from "@/contexts/order.context";
import useFetch from "@/hooks/useFetch";
import { Order } from "@/types/order.interface";

function OrderProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useFetch<Order[]>("/order");

  const orders = useMemo(() => {
    return {
      orders: data,
      isLoading,
    };
  }, [data, isLoading]);

  return (
    <OrderContext.Provider value={orders}>{children}</OrderContext.Provider>
  );
}

export default OrderProvider;
