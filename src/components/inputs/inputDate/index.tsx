"use client";

import { InputType } from "@/types/inputType.interface";
import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";

export const InputDate = (props: InputType) => {
  const { label, value, onChange, style, param } = props;
  const pathname = usePathname();
  const ref = useRef("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramKey = param ? param : "date";
  const dateValue = value !== undefined ? value : (searchParams.get(paramKey) || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current = e.target.value;
    const params = new URLSearchParams(`${searchParams.toString()}`);
    if (e.target.value) {
      params.set(paramKey, e.target.value);
    } else {
      params.delete(paramKey);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className={"inputContainer"} style={style}>
      <span className={styles.label}>{label}</span>
      <input
        className={`input`}
        type="date"
        value={dateValue}
        onChange={(e) => (onChange ? onChange(e) : handleChange(e))}
      />
    </label>
  );
};
