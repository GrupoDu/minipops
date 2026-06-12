"use client";

import { SuppliersContext } from "@/contexts/suppliers.context";
import React, { useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { Suppliers } from "@/types/suppliers.type";

export const SupplierProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, status, error, isLoading } = useFetch<{
    suppliers: Suppliers[];
    page: number;
  }>("suppliers");

  const suppliers = useMemo(
    () => ({
      suppliers: data?.suppliers,
      page: data?.page || 1,
      status,
      error,
      isLoading,
    }),
    [data, error, isLoading, status],
  );

  return (
    <SuppliersContext.Provider value={suppliers}>
      {children}
    </SuppliersContext.Provider>
  );
};
