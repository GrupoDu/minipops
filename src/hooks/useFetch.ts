"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import debugLogger from "@/utils/debugLogger";
import { AxiosError } from "axios";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "react-toastify";

const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T | undefined>();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | undefined>();
  const [maxPages, setMaxPages] = useState(0);
  const [page, setPage] = useState(0);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    debugLogger(["Iniciando fetch..."], "useFetch");

    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        debugLogger(["Dados carregados com sucesso."], "useFetch");

        const fetchedData = await response.data;
        setData(fetchedData.data);
        setMaxPages(fetchedData.maxPages);
        setPage(fetchedData.page);

        debugLogger([`Dados carregados: ${fetchedData}`], "useFetch");

        setStatus("success");
      } catch (err) {
        const error = err as AxiosError;
        setStatus("error");
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, status, isLoading, error, maxPages, page };
};

export default useFetch;
