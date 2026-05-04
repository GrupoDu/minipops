"use client";

import styles from "./styles.module.scss";
import { JSX } from "react";

interface CardProps {
  title: string;
  boldText: string;
  subtext: string;
  icon: JSX.Element;
}

function Card(props: CardProps) {
  const { boldText, icon, subtext, title } = props;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.content}>
        <p>{title}</p>
        <h3>{boldText}</h3>
        <span>{subtext}</span>
      </div>
    </div>
  );
}

export default Card;
