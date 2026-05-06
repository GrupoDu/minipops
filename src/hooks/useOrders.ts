"use client";

import { useContext } from "react";
import { OrderContext } from "@/contexts/order.context";

function useOrders() {
  const context = useContext(OrderContext);

  if (!context) throw new Error("useOrders deve ser usado com um Provider.");

  return context;
}

export default useOrders;
