import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const API_URL = process.env["NEXT_PUBLIC_API_URL"];
const API_URL_DEV =
  process.env["NEXT_PUBLIC_API_URL_DEV"] || "http://localhost:8000";
const isProd = process.env["NODE_ENV"] === "production";
const API = isProd ? API_URL : API_URL_DEV;

if (isProd && !API_URL) throw new Error("Em produção mas sem API_URL definida");

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  timeoutErrorMessage: "Tempo de espera excedido. Tente novamente.",
});

interface AxiosErrorApi extends AxiosError {
  response: AxiosResponse;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosErrorApi) => {
    const isClient = typeof window !== "undefined";
    const isNotLoginPage = isClient && window.location.pathname !== "/login";

    if (isClient) toast.error(error.response?.data?.message);

    // if (isNotLoginPage) document.location.href = "login";

    return Promise.reject(error);
  },
);
