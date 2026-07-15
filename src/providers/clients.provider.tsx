"use client";

import { CustomersContext } from "@/contexts/customers.context";
import useFetch from "@/hooks/useFetch";
import { Customer } from "@/types/customer.interface";
import React, { useMemo } from "react";

function ClientsProvider({ children }: { children: React.ReactNode }) {
  const { status, data, error, isLoading } = useFetch<Customer[]>("/customer");

  const customers = useMemo(() => {
    return {
      customers: data,
      status: status || undefined,
      error,
      isLoading,
    };
  }, [data, error, isLoading, status]);

  return (
    <CustomersContext.Provider value={customers}>
      {children}
    </CustomersContext.Provider>
  );
}

export default ClientsProvider;
