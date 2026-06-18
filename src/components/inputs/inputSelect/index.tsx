import styles from "./styles.module.scss";
import { ChangeEvent, CSSProperties } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type InputSelectProps = {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
  filterTarget?: string;
};

const InputSelect = (props: InputSelectProps) => {
  const { options, value, label, onChange, placeholder, style, filterTarget } =
    props;
  const defaultValue = placeholder || "Selecione um opção";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);

    if (filterTarget) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(filterTarget, e.target.value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <label style={style} className={"inputContainer"}>
      <span className={styles.label}>{label}</span>
      <select className={"input"} value={value} onChange={handleChange}>
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
