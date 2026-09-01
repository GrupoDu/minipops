"use client";

import useFetch from "@/hooks/useFetch";
import { Product } from "@/types/product.interface";
import React, { useMemo } from "react";
import { ProductsContext } from "@/contexts/products.context";

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useFetch<Product[]>("/product");

  const products = useMemo(() => {
    return {
      products: data,
      isLoading,
    };
  }, [data, isLoading]);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
