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
import { IoTimeOutline } from "react-icons/io5";
import statusFormatter from "@/utils/statusFormatter";

export const OrderContainer = ({ orderId }: { orderId: string }) => {
  const { data: order } = useFetch<Order>(`order/${orderId}`);
  const isOrderDone =
    order?.status === "Concluido" || order?.status === "Cancelado";

  if (!order) return <OrderNotFound slug={orderId} />;

  const statusClass = order.status.replace(/\s+/g, "_");

  return (
    <>
      <Breadcrumb
        customLabels={{
          pedidos: "Lista de Pedidos",
          [orderId]: `Pedido ${order.customId}`,
        }}
      />
      <StatusButtons slug={orderId} show={!isOrderDone} />
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
              <span>Data de emissão: {dateFormatter(order.issuedAt)}</span>
            </div>
          </div>
        </div>
        <div
          className={`${styles.statusBar} ${styles[`status_${statusClass}`]}`}
        >
          <span>{statusFormatter(order.status)}</span>
        </div>
        {order.isOverdue && (
          <div className={styles.isOverdue}>
            <IoTimeOutline />
            <span>Atrasado</span>
          </div>
        )}
        <h4 className={styles.orderId}>Pedido: {order.customId}</h4>
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
