import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { Order } from "@/types/order.interface";
import { api } from "@/services/api";
import { priceFormatter } from "@/utils/priceFormatter";
import PrintButton from "@/components/printButton";
import { OrderItem } from "@/types/orderItem.interface";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import Logo from "@/assets/grupodu_new_logo.png";
import { dateFormatter } from "@/utils/dateFormatter";
import phoneFormatter from "@/utils/phoneFormatter";
import cepFormatter from "@/utils/cepFormatter";
import { StatusButtons } from "@/components/statusButtons";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = await getOrder(slug);
  const isOrderDone =
    order?.order_status === "Concluído" || order?.order_status === "Cancelado";
  const hasAddressNumber =
    !!order?.delivery.address_number &&
    order.delivery.address_number.toString().length === 3;

  if (!order) return <OrderNotFound slug={slug} />;

  const statusClass = order.order_status.replace(/\s+/g, "_");

  const renderOrderItems = (items: OrderItem[]) => {
    return items.map((item) => (
      <tr key={item.order_item_uuid}>
        <td>{item.products.acronym}</td>
        <td>{priceFormatter(item.unit_price)}</td>
        <td>{item.quantity} und.</td>
        <td>{item.discount_percentage}%</td>
        <td>{item.ipi}%</td>
        <td>{item.additional_amount}%</td>
        <td>{priceFormatter(item.total)}</td>
      </tr>
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

          {/* |--- TABELA ---| */}
          <div className={styles.revenueBillingContainer}>
            {/* |-- FATURAMENTO --| */}
            <div className={styles.revenueContainer}>
              <table>
                <thead className={styles.formSectionTitle}>
                  <tr>
                    <th>Faturamento</th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Razão Social</th>
                    <th>CNPJ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.clients.client_name}</td>
                    <td>{order.clients.client_cnpj}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Endereço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.clients.client_address}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th className={styles.bottomInfo}>Telefone</th>
                    <th className={styles.bottomInfo}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{phoneFormatter(order.clients.client_phone)}</td>
                    <td>{order.clients.client_name}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* |-- COBRANÇA --| */}
            <div className={styles.billingContainer}>
              <table>
                <thead className={styles.formSectionTitle}>
                  <tr>
                    <th>Cobrança</th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Nome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.billing.name}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Endereço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.billing.billing_address}</td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>CEP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{cepFormatter(order.billing.billing_cep)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* |-- ENTREGA --| */}
          <table>
            <thead className={styles.formSectionTitle}>
              <tr>
                <th>Entrega</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Obra</th>
                <th>Endereço</th>
                <th>CEP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.delivery.building}</td>
                <td>
                  {order.delivery.delivery_address}
                  {hasAddressNumber &&
                    ` - n°
                  ${order.delivery.address_number}`}
                </td>
                <td>{cepFormatter(order.delivery.delivery_cep)}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th className={styles.bottomInfo}>Celular</th>
                <th className={styles.bottomInfo}>Referência</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{phoneFormatter(order.delivery.contact_number)}</td>
                <td>
                  {order.delivery.reference || "Referência não informada."}
                </td>
              </tr>
            </tbody>
          </table>

          {/* |-- PRODUTOS --| */}
          <table>
            <thead className={styles.formSectionTitle}>
              <tr>
                <th>Produtos</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unit.</th>
                <th>Quantidade</th>
                <th>Desconto(%)</th>
                <th>IPI(%)</th>
                <th>Acrescimo(%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{renderOrderItems(order.order_items)}</tbody>
          </table>

          {/* Total */}
          <table style={{ marginTop: ".6rem" }} className={styles.totalSection}>
            <tbody>
              <tr>
                <th>Valor Total</th>
              </tr>
              <tr>
                <td style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {priceFormatter(order.total_price)}
                </td>
              </tr>
            </tbody>
          </table>
          <PrintButton />
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
