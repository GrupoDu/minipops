"use client";

import styles from "./styles.module.scss";
import TableHeader from "@/components/tableHeader";
import useOrders from "@/hooks/useOrders";
import { Order } from "@/types/order.interface";
import { usePathname } from "next/navigation";
import { dateFormatter } from "@/utils/dateFormatter";
import { priceFormatter } from "@/utils/priceFormatter";
import { CSSProperties } from "react";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";

function OrderList() {
  const tableHeaderTitles = [
    "Pedido",
    "Cliente",
    "Obra",
    "Status",
    "Total",
    "Ações",
  ];
  const { orders, isLoading } = useOrders();
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const pendingOrders = orders?.filter(
    (order) => order.order_status === "Pendente",
  );
  const ordersToUse = isDashboard ? pendingOrders : orders;

  return (
    <div className={styles.orderListComponent}>
      <TableHeader titles={tableHeaderTitles} />
      {displayItems(ordersToUse, isLoading)}
    </div>
  );
}

function displayItems(orders: Order[] | undefined, isLoading: boolean) {
  if (isLoading)
    return <div className={styles.fetchLoading}>Carregando...</div>;

  if (!orders)
    return <div className={styles.fetchError}>Erro ao carregar pedidos.</div>;

  return (
    <ul className={styles.ordersList}>
      {orders.map((order) => (
        <li key={order.order_uuid}>
          <div className={styles.orderIdContainer}>
            <span className={styles.orderId}>{order.order_uuid}</span>
            <span className={styles.orderDate}>
              {dateFormatter(order.created_at)}
            </span>
          </div>
          <span>{order.clients.client_name}</span>
          <span>{order.delivery.building}</span>
          <span style={statusStyle(order.order_status)}>
            {order.order_status}
          </span>
          <span>{priceFormatter(order.totalPrice)}</span>
          <div className={styles.buttonContainer}>
            <Link
              href={`/pedidos/${order.order_uuid}`}
              className={styles.detailsButton}
            >
              <CgDetailsMore color={"#000000"} />
              <span className={styles.buttonText}>Detalhes</span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

function statusStyle(status: string): CSSProperties {
  const defaultStyle: CSSProperties = {
    padding: ".4rem",
    borderRadius: ".8rem",
    textAlign: "center",
    boxSizing: "border-box",
  };

  switch (status) {
    case "Pendente":
      return {
        ...defaultStyle,
        color: "var(--pending-color)",
        border: "1px solid var(--pending-color)",
        backgroundColor: "var(--pending-bg)",
      };
    case "Em produção":
      return {
        ...defaultStyle,
        color: "var(--on-going-color)",
        border: "1px solid var(--on-going-color)",
        backgroundColor: "var(--on-going-bg)",
      };
    case "Concluído":
      return {
        ...defaultStyle,
        color: "var(--done-color)",
        border: "1px solid var(--done-color)",
        backgroundColor: "var(--done-bg)",
      };
    case "Cancelado":
      return {
        ...defaultStyle,
        color: "var(--cancel-color)",
        border: "1px solid var(--cancel-color)",
        backgroundColor: "var(--cancel-bg)",
      };
    case "Enviado":
      return {
        ...defaultStyle,
        color: "var(--shipped-color)",
        border: "1px solid var(--cancel-color)",
        backgroundColor: "var(--cancel-bg)",
      };
    default:
      return {
        ...defaultStyle,
      };
  }
}

export default OrderList;
