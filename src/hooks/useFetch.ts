"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import debugLogger from "@/utils/debugLogger";
import { AxiosError } from "axios";
import { useLoading } from "@/hooks/useLoading";

const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T | undefined>();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | undefined>();
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    debugLogger(["Iniciando fetch..."], "useFetch");

    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        debugLogger(["Dados carregados com sucesso."], "useFetch");

        setData(response.data?.data);
        debugLogger([`Dados carregados: ${data}`], "useFetch");
        setStatus("success");
      } catch (err) {
        const error = err as AxiosError;
        setStatus("error");
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, status, isLoading, error };
};

export default useFetch;
