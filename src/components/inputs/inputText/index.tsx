import styles from "./styles.module.scss";
import { CSSProperties } from "react";

type InputTextProps = {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
};

const InputText = (props: InputTextProps) => {
  const { placeholder, type, value, onChange, label, style } = props;

  return (
    <label style={style} className={"inputContainer"}>
      <span className={styles.label}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={"input"}
      />
    </label>
  );
};

export default InputText;
