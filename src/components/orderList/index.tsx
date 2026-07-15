"use client";

import styles from "./styles.module.scss";
import { Order, OrderPagination } from "@/types/order.interface";
import { PaginationType } from "@/types/pagination.interface";
import { usePathname, useSearchParams } from "next/navigation";
import { dateFormatter } from "@/utils/dateFormatter";
import { priceFormatter } from "@/utils/priceFormatter";
import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";
import useFetch from "@/hooks/useFetch";
import FilterContainer from "@/components/filterContainer";
import { InputDate } from "@/components/inputs/inputDate";
import { Customer } from "@/types/customer.interface";
import InputSelect from "@/components/inputs/inputSelect";
import { STATUS_CONSTANT } from "@/constants/status.constant";
import { Pagination } from "@/components/pagination";
import { useLoading } from "@/hooks/useLoading";
import { LoadingBlock } from "@/components/loadingBlock";
import { FetchPayload } from "@/types/fetchPayload.interface";

function OrderList() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const customer = searchParams.get("customer");
  const date = searchParams.get("date");
  const { setIsLoading } = useLoading();
  const [clientFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [endpoint, setEndpoint] = useState(
    `order/offset?page=${page ? page : 1}&pageSize=${pageSize ? pageSize : 7}${customer ? `&customer=${customer}` : ""}${date ? `&created_at=${date}` : ""}`,
  );

  useEffect(() => {
    // TODO Pensar numa forma de remover esse useState daqui
    setEndpoint(
      `order/offset?page=${page ? page : 1}&pageSize=${pageSize ? pageSize : 7}${customer ? `&customer=${customer}` : ""}${date ? `&created_at=${date}` : ""}`,
    );

    console.log();
  }, [page, pageSize, customer, date]);

  const { data: orders, isLoading, maxPages } = useFetch<Order[]>(endpoint);
  const { data: customers } = useFetch<Customer[]>("customer");
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const pendingOrders = orders?.filter(
    (order) => order.orderStatus === "Pendente",
  );
  const ordersToUse = isDashboard ? pendingOrders : orders;
  const isOrdersEmpty = !ordersToUse || ordersToUse.length < 1;
  const tableHeads = {
    id: "ID",
    customer: "Cliente",
    building: "Obra",
    status: "Status",
    total: "Total",
    actions: "Ações",
  } as const;
  const customersOptions =
    customers?.map((customer) => ({
      value: customer.customerUuid,
      label: customer.tradingName,
    })) || [];
  const statusOptions = Object.values(STATUS_CONSTANT).map((status) => ({
    value: status,
    label: status,
  }));

  console.log(customers);

  return (
    <>
      {!isDashboard && (
        <FilterContainer
          isAvailable={true}
          setEndpoint={setEndpoint}
          target={"orders"}
        >
          <InputSelect
            label={"Cliente"}
            options={customersOptions}
            value={clientFilter}
            filterTarget={"customer"}
            onChange={(e) => setCustomerFilter(e.target.value)}
          />
          <InputSelect
            label={"Status"}
            options={statusOptions}
            filterTarget={"status"}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <InputDate label={"Data de emissão"} param={"createdAt"} />
        </FilterContainer>
      )}
      {isLoading ? (
        <LoadingBlock />
      ) : isOrdersEmpty ? (
        <EmptyList targetName={"pedido"} />
      ) : (
        <>
          <ListTemplate heads={Object.values(tableHeads)}>
            {ordersToUse.map((order) => (
              <tr key={order.customOrderId}>
                <td>
                  <div className={styles.orderIdContainer}>
                    <span className={styles.orderId}>
                      {order.customOrderId}
                    </span>
                    <span className={styles.orderDate}>{order.createdAt}</span>
                  </div>
                </td>
                <td>{order.customer.companyName}</td>
                <td>{order.delivery.building}</td>
                <td>
                  <div style={statusStyle(order.orderStatus)}>
                    {order.orderStatus}
                  </div>
                </td>

                <td>{priceFormatter(order.totalPrice)}</td>
                <td>
                  <Link
                    className={styles.buttonContainer}
                    href={`/pedidos/${order.customOrderId}`}
                    onClick={() => setIsLoading(true)}
                  >
                    <CgDetailsMore color={"#000000"} />
                    <span className={styles.buttonText}>Detalhes</span>
                  </Link>
                </td>
              </tr>
            ))}
          </ListTemplate>
          {!isDashboard && <Pagination maxPage={maxPages || 1} />}
        </>
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
