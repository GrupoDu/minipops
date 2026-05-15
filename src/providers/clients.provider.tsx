"use client";

import { ClientsContext } from "@/contexts/clients.context";
import useFetch from "@/hooks/useFetch";
import { Client } from "@/types/client.interface";
import React, { useMemo } from "react";

function ClientsProvider({ children }: { children: React.ReactNode }) {
  const { status, data, error, isLoading } = useFetch<Client[]>("/clients");

  const clients = useMemo(() => {
    return {
      clients: data,
      status: status || undefined,
      error,
      isLoading,
    };
  }, [data, error, isLoading, status]);

  return (
    <ClientsContext.Provider value={clients}>
      {children}
    </ClientsContext.Provider>
  );
}

export default ClientsProvider;
