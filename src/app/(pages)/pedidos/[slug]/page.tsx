import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { Order } from "@/types/order.interface";
import { api } from "@/services/api";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import Logo from "@/assets/grupodu_new_logo.png";
import { dateFormatter } from "@/utils/dateFormatter";
import { StatusButtons } from "@/components/statusButtons";
import { OrderInfos } from "@/components/orderInfos";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = await getOrder(slug);
  const isOrderDone =
    order?.order_status === "Concluído" || order?.order_status === "Cancelado";

  if (!order) return <OrderNotFound slug={slug} />;

  const statusClass = order.order_status.replace(/\s+/g, "_");

  return (
    <div className="pageContainer">
      <PageHeader
        title="Pedidos"
        description="Acompanhe pedidos por status, período, cliente e fornecedor."
      />
      <Breadcrumb
        customLabels={{
          pedidos: "Lista de Pedidos",
          [slug]: `Pedido ${order.custom_order_id}`,
        }}
      />
      <div className="mainContent">
        <StatusButtons slug={slug} show={!isOrderDone} />
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
      </div>
    </div>
  );
}

async function getOrder(slug: string): Promise<Order | null> {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  try {
    const response = await api.get(`/orders/${slug}`, {
      headers: {
        Cookie: cookieString,
      },
    });

    return response.data?.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

function OrderNotFound({ slug }: { slug: string }) {
  return (
    <div className="pageContainer">
      <PageHeader
        title="Pedidos"
        description="Acompanhe pedidos por status, período, cliente e fornecedor."
      />
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
    </div>
  );
}
