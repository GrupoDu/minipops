"use client";

import { CustomersContext } from "@/contexts/customers.context";
import useFetch from "@/hooks/useFetch";
import { Customer } from "@/types/customer.interface";
import React, { useMemo } from "react";

function ClientsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useFetch<Customer[]>("/customer");

  const customers = useMemo(() => {
    return {
      customers: data,
      isLoading,
    };
  }, [data, isLoading]);

  return (
    <CustomersContext.Provider value={customers}>
      {children}
    </CustomersContext.Provider>
  );
}

export default ClientsProvider;
