import { LoadingContext } from "@/contexts/loading.context";
import { useContext } from "react";

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context)
    throw new Error("useLoading deve ser usado com um LoadingProvider");

  return context;
};
