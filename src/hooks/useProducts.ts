import { useContext } from "react";
import { ProductsContext } from "@/contexts/products.context";

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) throw new Error("useProducts deve ser usado com um Provider");

  return context;
};

export default useProducts;
