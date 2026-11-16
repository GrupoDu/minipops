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
  isDisabled?: boolean;
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
    isDisabled,
  } = props;
  const { setShowModal } = useModal();
  const { isLoading } = useLoading();
  const pointerEvents = isLoading || isDisabled ? "none" : "auto";
  const cursor = isLoading || isDisabled ? "cell" : "pointer";
  const opacity = isLoading || isDisabled ? 0.5 : 1;

  if (isLink) {
    return (
      <Link
        href={href || "#"}
        style={{
          ...style,
          pointerEvents,
          cursor,
        }}
        className={`${styles.buttonDefault} ${className} ${isDisabled && styles.disabled}`}
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
        pointerEvents,
        cursor,
        opacity,
      }}
      className={`${styles.buttonDefault} ${className} ${isDisabled && styles.disabled}`}
      onClick={modal ? () => setShowModal(true) : onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
