"use client";

import useFetch from "@/hooks/useFetch";
import { Product } from "@/types/product.interface";
import React, { useMemo } from "react";
import { ProductsContext } from "@/contexts/products.context";

const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const { status, data, error, isLoading } = useFetch<Product[]>("/product");

  const products = useMemo(() => {
    return {
      products: data,
      status,
      error,
      isLoading,
    };
  }, [status, data, error, isLoading]);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
