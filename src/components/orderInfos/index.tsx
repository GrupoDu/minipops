"use client";

import styles from "./styles.module.scss";
import { priceFormatter } from "@/utils/priceFormatter";
import PrintButton from "../printButton";
import { Order } from "@/types/order.interface";
import { useLoading } from "@/hooks/useLoading";
import phoneFormatter from "@/utils/phoneFormatter";
import cepFormatter from "@/utils/cepFormatter";
import { OrderItem } from "@/types/orderItem.interface";
import { useEffect } from "react";

export const OrderInfos = ({ order }: { order: Order }) => {
  const { setIsLoading, isLoading } = useLoading();

  const hasAddressNumber =
    !!order?.delivery.address_number &&
    order.delivery.address_number.toString().length === 3;

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

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
      {/* |--- TABELA ---| */}
      <div className={styles.revenueBillingContainer}>
        {/* |-- FATURAMENTO --| */}
        <div className={styles.revenueContainer}>
          <table className={styles.table}>
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
                <td>{order.clients.company_name}</td>
                <td>{order.clients.client_cnpj}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.table}>
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
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.bottomInfo}>Telefone</th>
                <th className={styles.bottomInfo}>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{phoneFormatter(order.clients.client_phone)}</td>
                <td>{order.clients.company_name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* |-- COBRANÇA --| */}
        <div className={styles.billingContainer}>
          <table className={styles.table}>
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
          <table className={styles.table}>
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
          <table className={styles.table}>
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
      <table className={styles.table}>
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.bottomInfo}>Celular</th>
            <th className={styles.bottomInfo}>Referência</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{phoneFormatter(order.delivery.contact_number)}</td>
            <td>{order.delivery.reference || "Referência não informada."}</td>
          </tr>
        </tbody>
      </table>

      {/* |-- PRODUTOS --| */}
      <table className={styles.table}>
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
      <table
        style={{ marginTop: ".6rem" }}
        className={`${styles.totalSection} ${styles.table}`}
      >
        <thead>
          <tr>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: "1rem", fontWeight: 600 }}>
              {priceFormatter(order.total_price)}
            </td>
          </tr>
        </tbody>
      </table>
      <PrintButton />
    </>
  );
};
