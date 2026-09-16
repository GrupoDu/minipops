"use client";

import { createContext } from "react";
import { Client } from "@/types/client.interface";

interface ClientsContextProps {
  clients: Client[] | undefined;
}

export const ClientsContext = createContext<
  ClientsContextProps | undefined
>(undefined);
