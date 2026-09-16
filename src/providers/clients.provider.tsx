"use client";

import { ClientsContext } from "@/contexts/client.context";
import useFetch from "@/hooks/useFetch";
import { Client } from "@/types/client.interface";
import React, { useMemo } from "react";

function ClientsProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useFetch<Client[]>("/client");

  const clients = useMemo(() => {
    return {
      clients: data,
      isLoading,
    };
  }, [data, isLoading]);

  return (
    <ClientsContext.Provider value={clients}>
      {children}
    </ClientsContext.Provider>
  );
}

export default ClientsProvider;
