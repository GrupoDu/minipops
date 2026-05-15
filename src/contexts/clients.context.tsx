"use client";

import { createContext } from "react";
import { Client } from "@/types/client.interface";

interface ClientsContextProps {
  clients: Client[] | undefined;
  status: string | undefined;
  error: string | undefined;
}

export const ClientsContext = createContext<ClientsContextProps | undefined>(
  undefined,
);
