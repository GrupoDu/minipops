import { useContext } from "react";
import { CustomersContext } from "@/contexts/customers.context";

function useCustomers() {
  const context = useContext(CustomersContext);

  if (!context) throw new Error("useCustomers deve ser usado com um Provider.");

  return context;
}

export default useCustomers;
