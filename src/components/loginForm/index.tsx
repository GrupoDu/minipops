"use client";

import React, { useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/login", {
        email,
        password,
        userRole: "Vendas",
      });

      router.push("/dashboard");
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        {isLoading ? "Carregando..." : "Entrar"}
      </button>
    </form>
  );
}
