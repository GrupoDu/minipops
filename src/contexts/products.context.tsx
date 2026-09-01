import { createContext } from "react";
import { Product } from "@/types/product.interface";

type ProductsContextValues = {
  products: Product[] | undefined;
  isLoading: boolean;
};

export const ProductsContext = createContext<ProductsContextValues | undefined>(
  undefined,
);
