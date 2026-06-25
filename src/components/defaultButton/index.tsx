"use client";

import styles from "./styles.module.scss";
import { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { useLoading } from "@/hooks/useLoading";

type DefaultButtonProps = {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  isLink?: boolean;
  href?: string;
  style?: CSSProperties;
  className?: string;
  modal?: boolean;
  prefetch?: boolean;
};

const DefaultButton = (props: DefaultButtonProps) => {
  const {
    onClick,
    children,
    type,
    style,
    isLink,
    href,
    className,
    modal,
    prefetch,
  } = props;
  const { setShowModal } = useModal();
  const { isLoading } = useLoading();

  if (isLink) {
    return (
      <Link
        href={href || "#"}
        style={{
          ...style,
          pointerEvents: isLoading ? "none" : "auto",
          cursor: isLoading ? "cell" : "pointer",
        }}
        className={`${styles.buttonDefault} ${className}`}
        prefetch={prefetch}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={{
        ...style,
        pointerEvents: isLoading ? "none" : "auto",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? "0.5" : "1",
      }}
      className={`${styles.buttonDefault} ${className}`}
      onClick={modal ? () => setShowModal(true) : onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
