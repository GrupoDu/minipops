"use client";

import styles from "./styles.module.scss";
import { CSSProperties, useRef, useState } from "react";
import { InputType } from "@/types/inputType.interface";
import { BiSearch } from "react-icons/bi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InputTextProps extends InputType {
  type: "text" | "email" | "password" | "number";
  filterTarget?: string;
  placeholder?: string;
  isSearch?: boolean;
  min?: number;
  max?: number;
  style?: CSSProperties;
  readonly?: boolean;
}

const InputText = (props: InputTextProps) => {
  const {
    placeholder,
    type,
    value,
    onChange,
    label,
    style,
    required,
    min,
    isSearch,
    filterTarget,
    readonly,
    max,
  } = props;

  const [filterValue, setFilterValue] = useState("");
  const ref = useRef("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!filterTarget) return;

    setFilterValue(e.target.value);
    ref.current = e.target.value;
    const params = new URLSearchParams(`${searchParams.toString()}`);
    params.set(filterTarget, ref.current);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <label style={style} className={"inputContainer"}>
      {isSearch ? (
        <>
          <span className={`${styles.label} ${required && styles.isRequired}`}>
            {label}
          </span>
          <div className="input">
            <BiSearch />
            <input
              type={type}
              value={isSearch ? value : filterValue}
              min={min}
              onChange={(e) =>
                isSearch && onChange ? onChange(e) : handleFilterSearch(e)
              }
              placeholder={placeholder}
              className={styles.searchInput}
              required={required}
            />
          </div>
        </>
      ) : (
        <>
          <span className={`${styles.label} ${required && styles.isRequired}`}>
            {label}
          </span>
          <input
            type={type}
            value={value}
            readOnly={readonly}
            min={min}
            maxLength={max}
            max={max}
            onChange={onChange}
            placeholder={placeholder}
            className={"input"}
            required={required}
          />
        </>
      )}
    </label>
  );
};

export default InputText;
