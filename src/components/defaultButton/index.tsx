"use client";

import styles from "./styles.module.scss";
import { CSSProperties, ReactNode } from "react";

type DefaultButtonProps = {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
};

const DefaultButton = (props: DefaultButtonProps) => {
  const { onClick, children, type, style } = props;

  return (
    <button
      style={style}
      className={styles.buttonDefault}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
