"use client";

import { InputType } from "@/types/inputType.interface";
import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";

export const InputDate = (props: InputType) => {
  const { label, value, onChange, style } = props;
  const pathname = usePathname();
  const ref = useRef("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLDataElement>) => {
    ref.current = e.target.value;
    const params = new URLSearchParams(`${searchParams.toString()}`);
    params.set("date", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label className={"inputContainer"} style={style}>
      <span className={styles.label}>{label}</span>
      <input
        className={`input`}
        type="date"
        value={value}
        onChange={(e) => (onChange ? onChange(e) : handleChange(e))}
      />
    </label>
  );
};
