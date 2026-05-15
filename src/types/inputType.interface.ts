import { ChangeEvent, CSSProperties } from "react";

export interface InputType {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  required?: boolean;
}
