import styles from "./styles.module.scss";
import { ChangeEvent, CSSProperties } from "react";

type InputSelectProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
};

const InputSelect = (props: InputSelectProps) => {
  const { options, value, label, onChange, placeholder, style } = props;
  const defaultValue = placeholder || "Selecione um opção";

  return (
    <label style={style} className={"inputContainer"}>
      <span className={styles.label}>{label}</span>
      <select className={"input"} value={value} onChange={onChange}>
        <option value="">{defaultValue}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InputSelect;
