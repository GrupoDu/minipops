"use client";

import styles from "./styles.module.scss";
import { Order } from "@/types/order.interface";
import { usePathname } from "next/navigation";
import { dateFormatter } from "@/utils/dateFormatter";
import { priceFormatter } from "@/utils/priceFormatter";
import { CSSProperties } from "react";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";
import useFetch from "@/hooks/useFetch";

function OrderList() {
  const { data: orders, isLoading } = useFetch<Order[]>("orders");
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const pendingOrders = orders?.filter(
    (order) => order.order_status === "Pendente",
  );
  const ordersToUse = isDashboard ? pendingOrders : orders;
  const isOrdersEmpty = !ordersToUse || ordersToUse.length < 1;
  const heads = ["ID", "Cliente", "Obra", "Status", "Total", "Ações"];

  if (isLoading)
    return <div className={styles.fetchLoading}>Carregando...</div>;
  if (isOrdersEmpty) return <EmptyList targetName={"pedido"} />;

  return (
    <ListTemplate heads={heads}>
      {ordersToUse.map((order) => (
        <tr key={order.custom_order_id}>
          <td className={styles.orderIdContainer}>
            <span className={styles.orderId}>{order.custom_order_id}</span>
            <span className={styles.orderDate}>
              {dateFormatter(order.created_at)}
            </span>
          </td>
          <td>{order.clients.client_name}</td>
          <td>{order.delivery.building}</td>
          <td style={statusStyle(order.order_status)}>{order.order_status}</td>
          <td>{priceFormatter(order.total_price)}</td>
          <td className={styles.buttonContainer}>
            <Link href={`/pedidos/${order.custom_order_id}`}>
              <CgDetailsMore color={"#000000"} />
              <span className={styles.buttonText}>Detalhes</span>
            </Link>
          </td>
        </tr>
      ))}
    </ListTemplate>
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
