import styles from "./styles.module.scss";
import { OrderItem } from "@/types/orderItem.interface";
import { CSSProperties } from "react";

type OrderItemInfosType = {
  orderItem: OrderItem[];
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  isLastItem: boolean;
};

export const OrderItemInfos = ({
  orderItem,
  isVisible,
  setIsVisible,
  isLastItem,
}: OrderItemInfosType) => {
  const lastItemStyle: CSSProperties = isLastItem
    ? {
        top: 0,
        bottom: "2rem",
      }
    : {
        top: "4rem",
        bottom: 0,
      };

  return (
    <ul
      className={styles.orderItemInfosContainer}
      style={{
        top: isLastItem ? "3rem" : "-3rem",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      onMouseLeave={() => setIsVisible(false)}
    >
      {orderItem.map((item) => (
        <li key={item.uuid}>{item.product.name}</li>
      ))}
    </ul>
  );
};
