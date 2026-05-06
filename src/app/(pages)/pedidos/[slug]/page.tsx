import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { Order } from "@/types/order.interface";
import { api } from "@/services/api";
import TableHeader from "@/components/tableHeader";
import { priceFormatter } from "@/utils/priceFormatter";
import PrintButton from "@/components/printButton";
import { OrderItem } from "@/types/orderItem.interface";
import { cookies } from "next/headers";
import OrderField from "@/components/orderFields";
import Breadcrumb from "@/components/breadcrumb";

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

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = await getOrder(slug);

  if (!order) {
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

  const statusClass = order.order_status.replace(/\s+/g, "_");

  const tableHeaderTitles = [
    "Produto",
    "Valor unit.",
    "Quantidade",
    "Desconto(%)",
    "IPI(%)",
    "Acréscimo(%)",
    "Total",
  ];

  const renderOrderItems = (items: OrderItem[]) => {
    return items.map((item) => (
      <li key={item.order_item_uuid}>
        <span>{item.product_uuid}</span>
        <span>{priceFormatter(item.unit_price)}</span>
        <span>{item.quantity}</span>
        <span>{item.discount_percentage}%</span>
        <span>{item.ipi}%</span>
        <span>{item.additional_amount}%</span>
        <span>{priceFormatter(item.total)}</span>
      </li>
    ));
  };

  return (
    <div className="pageContainer">
      <PageHeader
        title="Pedidos"
        description="Acompanhe pedidos por status, período, cliente e fornecedor."
      />
      <Breadcrumb
        customLabels={{
          pedidos: "Lista de Pedidos",
          [slug]: `Pedido ${order.order_uuid}`,
        }}
      />
      <div className="mainContent">
        <div className={styles.orderContainer}>
          <div
            className={`${styles.statusBar} ${styles[`status_${statusClass}`]}`}
          />

          <h3>Pedido: {order.order_uuid}</h3>

          <hr />

          <div className={styles.orderInfoBlocks}>
            <h5>Faturamento</h5>
            <OrderField label="Cliente" value={order.clients.client_name} />
            <OrderField label="CNPJ" value={order.revenue.revenue_cnpj} />
            <OrderField
              label="Endereço"
              value={order.revenue.revenue_address}
            />
            <OrderField label="Telefone" value={order.revenue.revenue_phone} />
            <OrderField label="E-mail" value={order.revenue.revenue_email} />
          </div>

          <div className={styles.orderInfoBlocks}>
            <h5>Cobrança</h5>
            <OrderField label="Nome" value={order.billing.name} />
            <OrderField
              label="Endereço"
              value={order.billing.billing_address}
            />
          </div>

          <div className={styles.orderInfoBlocks}>
            <h5>Entrega</h5>
            <OrderField label="Obra" value={order.delivery.building} />
            <OrderField
              label="Endereço"
              value={order.delivery.delivery_address}
            />
            <OrderField label="Referência" value={order.delivery.reference} />
            <OrderField
              label="Observação"
              value={order.delivery.delivery_observation}
            />
          </div>
          <div className={styles.orderInfoBlocks}>
            <h5>Produtos</h5>
            <TableHeader titles={tableHeaderTitles} />
            <ul className={styles.itemsList}>
              {renderOrderItems(order.order_items)}
            </ul>
          </div>
          <div className={styles.totalSection}>
            <hr />
            <h3>Valor total: {priceFormatter(order.totalPrice)}</h3>
          </div>

          <PrintButton />
        </div>
      </div>
    </div>
  );
}
