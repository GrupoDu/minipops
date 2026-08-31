"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import debugLogger from "@/utils/debugLogger";
import { AxiosError } from "axios";
import { useLoading } from "@/hooks/useLoading";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const useFetch = <T>(endpoint: string, trackParams?: boolean) => {
  const [data, setData] = useState<T | undefined>();
  const searchParams = useSearchParams();
  const [maxPages, setMaxPages] = useState(0);
  const [page, setPage] = useState(0);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    debugLogger(["Iniciando fetch..."], "useFetch");
    const params = new URLSearchParams(searchParams);
    const hasFilters = params.size > 2;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const url = `${endpoint}${trackParams && hasFilters ? `?${params.toString()}` : ""}`;

        const response = await api.get(url);
        debugLogger(["Dados carregados com sucesso."], "useFetch");

        const fetchedData = await response.data;
        setData(fetchedData.data);
        setMaxPages(fetchedData.maxPages);
        setPage(fetchedData.page);
      } catch (err) {
        const error = err as AxiosError;
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, searchParams, trackParams]);

  return { data, isLoading, maxPages, page };
};

export default useFetch;
