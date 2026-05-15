import styles from "./styles.module.scss";
import { CSSProperties } from "react";
import { InputType } from "@/types/inputType.interface";

interface InputTextProps extends InputType {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  min?: number;
  style?: CSSProperties;
}

const InputText = (props: InputTextProps) => {
  const { placeholder, type, value, onChange, label, style, required, min } =
    props;

  return (
    <label style={style} className={"inputContainer"}>
      <span className={`${styles.label} ${required && styles.isRequired}`}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        min={min}
        onChange={onChange}
        placeholder={placeholder}
        className={"input"}
        required={required}
      />
    </label>
  );
};

export default InputText;
