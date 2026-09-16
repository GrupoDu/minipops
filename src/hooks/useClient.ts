import { useContext } from "react";
import { ClientsContext } from "@/contexts/client.context";

function useClient() {
  const context = useContext(ClientsContext);

  if (!context) throw new Error("useCustomers deve ser usado com um Provider.");

  return context;
}

export default useClient;
