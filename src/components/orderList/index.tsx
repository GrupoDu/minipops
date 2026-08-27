"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useState } from "react";
import Link from "next/link";
import { useLoading } from "@/hooks/useLoading";
import useFetch from "@/hooks/useFetch";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";
import FilterContainer from "@/components/filterContainer";
import InputSelect from "@/components/inputs/inputSelect";
import { Pagination } from "@/components/pagination";
import { LoadingBlock } from "@/components/loadingBlock";
import { setQueryParams } from "@/utils/setQueryParams";
import { extractOptionsArray } from "@/utils/extractOptionsArray";
import { priceFormatter } from "@/utils/priceFormatter";
import { CgDetailsMore } from "react-icons/cg";
import { Customer } from "@/types/customer.interface";
import { Order } from "@/types/order.interface";
import { STATUS_CONSTANT } from "@/constants/status.constant";
import { ORDER_TABLE_HEADS } from "@/constants/tableHeads.constant";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { MONTH_OPTIONS } from "@/constants/monthsOptions.constant";
import { dateFormatter } from "@/utils/dateFormatter";
import { hasFilters } from "@/utils/hasFilters";

function OrderList() {
  const searchParams = useSearchParams();
  const { setIsLoading } = useLoading();
  const [clientFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const endpoint = `order${hasFilters(searchParams) ? "/filter" : `/offset?${searchParams.toString()}`}`;
  const router = useRouter();

  const {
    data: orders,
    isLoading,
    maxPages,
  } = useFetch<Order[]>(endpoint, TRACK_PARAMS);
  const { data: customers } = useFetch<Customer[]>("customer");
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const isOrdersEmpty = !orders || orders.length < 1;
  const customersOptions =
    customers?.map((customer) => ({
      value: customer.customerUuid,
      label: customer.tradingName,
    })) || [];

  const handleCustomerChange = (value: string) => {
    setCustomerFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "customerUuid",
      value,
    });
    router.push(`${pathname}?${params}`);
  };
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "status",
      value,
    });
    router.push(`${pathname}?${params}`);
  };
  const handleMonthChange = (value: string) => {
    setMonthFilter(value);
    const params = setQueryParams({ searchParams, key: "month", value });
    router.push(`${pathname}?${params}`);
  };

  return (
    <>
      {!isDashboard && (
        <FilterContainer isFiltersAvailable={true} target={"orders"}>
          <InputSelect
            label={"Cliente"}
            options={customersOptions}
            value={clientFilter}
            filterTarget={"customerUuid"}
            onChange={(e) => handleCustomerChange(e.target.value)}
          />
          <InputSelect
            label={"Status"}
            options={STATUS_CONSTANT}
            filterTarget={"status"}
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
          />
          <InputSelect
            label={"Mês de emissão"}
            options={extractOptionsArray(MONTH_OPTIONS)}
            filterTarget={"month"}
            value={monthFilter}
            onChange={(e) => handleMonthChange(e.target.value)}
          />
        </FilterContainer>
      )}
      {isLoading ? (
        <LoadingBlock />
      ) : isOrdersEmpty ? (
        <EmptyList targetName={"pedido"} />
      ) : (
        <>
          <ListTemplate heads={ORDER_TABLE_HEADS}>
            {orders.map((order) => (
              <tr key={order.customOrderId}>
                <td>
                  <div className={styles.orderIdContainer}>
                    <span className={styles.orderId}>
                      {order.customOrderId}
                    </span>
                    <span className={styles.orderDate}>
                      {dateFormatter(order.issuedAt)}
                    </span>
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
                    href={`/pedidos/${order.orderId}`}
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
    case "Concluido":
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
