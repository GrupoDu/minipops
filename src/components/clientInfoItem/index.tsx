"use client";

import styles from "./styles.module.scss";
import React from "react";

type ClientInfoItemProps = {
  Icon: React.ReactNode;
  label: string;
  value: string;
};

const ClientInfoItem = (props: ClientInfoItemProps) => {
  const { Icon, value, label } = props;

  return (
    <li className={styles.clientInfoItemContainer}>
      <div className={styles.iconContainer}>{Icon}</div>
      <div className={styles.infoValue}>
        <span className={styles.label}>{label}</span>
        <h4>{value || "Não informado"}</h4>
      </div>
    </li>
  );
};

export default ClientInfoItem;
