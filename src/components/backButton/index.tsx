"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { DEFAULT_PARAMS } from "@/constants/defaultParams.constant";
import { useLoading } from "@/hooks/useLoading";

const BackButton = ({ style }: { style?: React.CSSProperties }) => {
  const listPages = [
    "fornecedores",
    "gastos",
    "usuarios",
    "pedidos",
    "clientes",
  ] as const;
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const pathname = usePathname();
  const handleBack = () => {
    for (const page in listPages) {
      if (pathname.includes(listPages[page])) {
        setIsLoading(true);
        router.push(`/${listPages[page]}?${DEFAULT_PARAMS}`);
        return;
      }
    }

    router.back();
  };

  return (
    <button
      className={styles.backButton}
      style={style}
      type={"button"}
      onClick={handleBack}
    >
      Voltar
    </button>
  );
};

export default BackButton;
