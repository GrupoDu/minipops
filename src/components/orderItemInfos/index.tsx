import styles from "./styles.module.scss";
import { OrderItem } from "@/types/orderItem.interface";

type OrderItemInfosType = {
  orderItem: OrderItem[];
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

export const OrderItemInfos = ({
  orderItem,
  isVisible,
  setIsVisible,
}: OrderItemInfosType) => {
  return (
    <ul
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      className={styles.orderItemInfosContainer}
      onMouseLeave={() => setIsVisible(false)}
    >
      {orderItem.map((item) => (
        <li key={item.uuid}>{item.product.name}</li>
      ))}
    </ul>
  );
};
