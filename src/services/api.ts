import axios, { InternalAxiosRequestConfig } from "axios";

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const isProd = process.env.NODE_ENV === "production";
const PROD_API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEV_API_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
const API_URL = isProd ? PROD_API_URL : DEV_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

type FailedQueue = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomAxiosConfig = error.config;

    if (originalRequest._retry) return Promise.reject(error);

    const isNotLoginPage =
      typeof window !== "undefined" &&
      !window.location.pathname.includes("login");

    // Se já está fazendo refresh, coloca na fila
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch((err) => {
          console.log("Mensagem de erro: ", err.message);
          return Promise.reject(err);
        });
    }

    // Marca que vai tentar refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axios.post(
        `${API_URL}/login/refresh`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Processa a fila com sucesso
      processQueue();

      // Tenta a requisição original novamente
      return api(originalRequest);
    } catch (err) {
      const refreshError = err as Error;
      console.log("Não foi possível fazer o refresh");
      // Processa a fila com erro
      processQueue(refreshError);

      // if (isNotLoginPage) window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
