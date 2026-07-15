import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";
import { RiErrorWarningLine } from "react-icons/ri";

export const WarningObs = ({
  warning,
  style,
}: {
  warning: string;
  style?: CSSProperties;
}) => {
  return (
    <div className={styles.warningObsContainer} style={style}>
      <div className={styles.warningTitle}>
        <RiErrorWarningLine className={styles.warningIcon} />
        <h4>Aviso!</h4>
      </div>
      <span>{warning}</span>
    </div>
  );
};
