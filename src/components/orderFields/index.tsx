import styles from "./styles.module.scss";

const OrderField = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) => (
  <div className={styles.orderField}>
    <span>{label}:</span>
    <div className={styles.valueField}>{value || ""}</div>
  </div>
);

export default OrderField;
