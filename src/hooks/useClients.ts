import { useContext } from "react";
import { ClientsContext } from "@/contexts/clients.context";

function useClients() {
  const context = useContext(ClientsContext);

  if (!context) throw new Error("useClients deve ser usado com um Provider.");

  return context;
}

export default useClients;
