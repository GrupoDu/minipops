import styles from "./styles.module.scss";
import TableHeader from "@/components/tableHeader";

function OrderList() {
  const tableHeaderTitles = [
    "Pedido",
    "Cliente",
    "Obra",
    "Status",
    "Total",
    "Ações",
  ];

  return (
    <div className={styles.orderListComponent}>
      <TableHeader titles={tableHeaderTitles} />
      <div className={styles.orders}></div>
    </div>
  );
}

export default OrderList;
