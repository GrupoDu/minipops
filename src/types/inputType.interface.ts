import { ChangeEvent, CSSProperties } from "react";

export interface InputType {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  style?: CSSProperties;
  required?: boolean;
}
