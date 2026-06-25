"use client";

import styles from "./styles.module.scss";
import { OrderInfos } from "../orderInfos";
import { StatusButtons } from "@/components/statusButtons";
import Image from "next/image";
import Logo from "@/assets/grupodu_new_logo.png";
import { dateFormatter } from "@/utils/dateFormatter";
import useFetch from "@/hooks/useFetch";
import { Order } from "@/types/order.interface";
import Breadcrumb from "@/components/breadcrumb";
import PageHeader from "@/components/pageHeader";

export const OrderContainer = ({ order_id }: { order_id: string }) => {
  const { data: order } = useFetch<Order>(`orders/${order_id}`);
  const isOrderDone =
    order?.order_status === "Concluído" || order?.order_status === "Cancelado";

  if (!order) return <OrderNotFound slug={order_id} />;

  const statusClass = order.order_status.replace(/\s+/g, "_");

  return (
    <>
      <Breadcrumb
        customLabels={{
          pedidos: "Lista de Pedidos",
          [order_id]: `Pedido ${order.custom_order_id}`,
        }}
      />
      <StatusButtons slug={order_id} show={!isOrderDone} />
      <div className={styles.orderContainer}>
        <div className={styles.printLogo}>
          <Image
            className={styles.logo}
            src={Logo}
            alt={"logo-grupodu"}
            width={100}
            height={100}
          />
          <div className={styles.textInfo}>
            <h3>GrupoDu</h3>
            <div className={styles.date}>
              <span>Data de emissão: {dateFormatter(order.created_at)}</span>
            </div>
          </div>
        </div>
        <div
          className={`${styles.statusBar} ${styles[`status_${statusClass}`]}`}
        ></div>
        <h4 className={styles.orderId}>Pedido: {order.custom_order_id}</h4>
        <hr />
        <OrderInfos order={order} />
      </div>
    </>
  );
};

function OrderNotFound({ slug }: { slug: string }) {
  return (
    <>
      <Breadcrumb
        customLabels={{
          pedidos: "Lista de Pedidos",
          [slug]: "Pedido não encontrado",
        }}
      />
      <div className="mainContent">
        <div className={styles.orderContainer}>
          <h3>Pedido não encontrado.</h3>
        </div>
      </div>
    </>
  );
}
