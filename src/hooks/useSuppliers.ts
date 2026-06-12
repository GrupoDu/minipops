import { useContext } from "react";
import { SuppliersContext } from "@/contexts/suppliers.context";

export const useSuppliers = () => {
  const context = useContext(SuppliersContext);

  if (!context) throw new Error("useSuppliers deve ser usado com um Provider.");

  return context;
};
