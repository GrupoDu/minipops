"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = ({ style }: { style?: React.CSSProperties }) => {
  const router = useRouter();

  return (
    <button
      className={styles.backButton}
      style={style}
      type={"button"}
      onClick={() => router.back()}
    >
      Voltar
    </button>
  );
};

export default BackButton;
