import { InputType } from "@/types/inputType.interface";
import styles from "@/components/inputs/inputText/styles.module.scss";

export const InputDate = (props: InputType) => {
  const { label, value, onChange, style } = props;

  return (
    <label className={"inputContainer"} style={style}>
      <span className={styles.label}>{label}</span>
      <input
        className={"input"}
        type="date"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
