"use client";

import styles from "./styles.module.scss";
import { OrderPagination } from "@/types/order.interface";
import { usePathname, useSearchParams } from "next/navigation";
import { dateFormatter } from "@/utils/dateFormatter";
import { priceFormatter } from "@/utils/priceFormatter";
import { CSSProperties, useState } from "react";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";
import useFetch from "@/hooks/useFetch";
import FilterContainer from "@/components/filterContainer";
import { InputDate } from "@/components/inputs/inputDate";
import { Client } from "@/types/client.interface";
import InputSelect from "@/components/inputs/inputSelect";
import { STATUS_CONSTANT } from "@/constants/status.constant";

function OrderList() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");
  const client = searchParams.get("client");
  const date = searchParams.get("date");
  const [clientFilter, setClientFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [endpoint, setEndpoint] = useState(
    `orders?page=${page ? page : 1}&per_page=${per_page ? per_page : 10}${client ? `&client=${client}` : ""}${date ? `&created_at=${date}` : ""}`,
  );
  const { data, isLoading } = useFetch<OrderPagination>(endpoint);
  const { data: clients } = useFetch<Client[]>("clients");
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const pendingOrders = data?.orders.filter(
    (order) => order.order_status === "Pendente",
  );
  const ordersToUse = isDashboard ? pendingOrders : data?.orders;
  const isOrdersEmpty = !ordersToUse || ordersToUse.length < 1;
  const tableHeads = {
    id: "ID",
    client: "Cliente",
    building: "Obra",
    status: "Status",
    total: "Total",
    actions: "Ações",
  } as const;
  const clientsOptions =
    clients?.map((client) => ({
      value: client.client_uuid,
      label: client.client_name,
    })) || [];
  const statusOptions = Object.values(STATUS_CONSTANT).map((status) => ({
    value: status,
    label: status,
  }));

  if (isLoading)
    return <div className={styles.fetchLoading}>Carregando...</div>;

  return (
    <>
      <FilterContainer setEndpoint={setEndpoint} target={"orders"}>
        <InputSelect
          label={"Cliente"}
          options={clientsOptions}
          value={clientFilter}
          filterTarget={"client"}
          onChange={(e) => setClientFilter(e.target.value)}
        />
        <InputSelect
          label={"Status"}
          options={statusOptions}
          filterTarget={"status"}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <InputDate label={"Data de emissão"} param={"created_at"} />
      </FilterContainer>
      {isOrdersEmpty ? (
        <EmptyList targetName={"pedido"} />
      ) : (
        <ListTemplate heads={Object.values(tableHeads)}>
          {ordersToUse.map((order) => (
            <tr key={order.custom_order_id}>
              <td>
                <div className={styles.orderIdContainer}>
                  <span className={styles.orderId}>
                    {order.custom_order_id}
                  </span>
                  <span className={styles.orderDate}>
                    {dateFormatter(order.created_at)}
                  </span>
                </div>
              </td>
              <td>{order.clients.client_name}</td>
              <td>{order.delivery.building}</td>
              <td>
                <div style={statusStyle(order.order_status)}>
                  {order.order_status}
                </div>
              </td>

              <td>{priceFormatter(order.total_price)}</td>
              <td>
                <Link
                  className={styles.buttonContainer}
                  href={`/pedidos/${order.custom_order_id}`}
                >
                  <CgDetailsMore color={"#000000"} />
                  <span className={styles.buttonText}>Detalhes</span>
                </Link>
              </td>
            </tr>
          ))}
        </ListTemplate>
      )}
    </>
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
