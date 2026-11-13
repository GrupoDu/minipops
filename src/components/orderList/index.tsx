"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
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
import { Client } from "@/types/client.interface";
import { Order } from "@/types/order.interface";
import { STATUS_CONSTANT } from "@/constants/status.constant";
import { ORDER_TABLE_HEADS } from "@/constants/tableHeads.constant";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { MONTH_OPTIONS } from "@/constants/monthsOptions.constant";
import { dateFormatter } from "@/utils/dateFormatter";
import { hasFilters } from "@/utils/hasFilters";
import { OrderItemInfos } from "../orderItemInfos";
import { BsInfoLg } from "react-icons/bs";
import statusFormatter from "@/utils/statusFormatter";

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
  const { data: clients } = useFetch<Client[]>("client");
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const isOrdersEmpty = !orders || orders.length < 1;
  const customersOptions =
    clients?.map((client) => ({
      value: client.uuid,
      label: client.tradingName,
    })) || [];

  const handleCustomerChange = (value: string) => {
    setCustomerFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "clientUuid",
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

  const clearFilters = () => {
    setCustomerFilter("");
    setStatusFilter("");
    setMonthFilter("");
  };

  return (
    <>
      {!isDashboard && (
        <FilterContainer
          isFiltersAvailable={true}
          target={"orders"}
          clearFiltersFunc={clearFilters}
        >
          <InputSelect
            label={"Cliente"}
            options={customersOptions}
            value={clientFilter}
            filterTarget={"clientUuid"}
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
            {orders.map((order, index) => (
              <OrderRow
                key={index}
                order={order}
                setIsLoading={setIsLoading}
                isLastItem={isLastOrder(orders, index)}
              />
            ))}
          </ListTemplate>
          {!isDashboard && <Pagination maxPage={maxPages || 1} />}
        </>
      )}
    </>
  );
}

function OrderRow({
  order,
  isLastItem,
  setIsLoading,
}: {
  order: Order;
  isLastItem: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <tr
        key={order.customId}
        className={`${order.isOverdue && styles.isOverdue}`}
      >
        <td>
          <div className={styles.orderIdContainer}>
            <span className={styles.orderId}>{order.customId}</span>
            <span className={styles.orderDate}>
              {dateFormatter(order.issuedAt)}
            </span>
          </div>
        </td>
        <td className={styles.clientName}>
          <span className={styles.lalala}>{order.client.name}</span>
        </td>
        <td className={styles.deliveryBuilding}>
          <span>{order.delivery.building}</span>
        </td>
        <td>
          <div className={styles[`status_${order.status}`]}>
            {statusFormatter(order.status)}
          </div>
        </td>
        <td>{priceFormatter(order.totalPrice)}</td>
        <td className={styles.actionButtonsContainer}>
          <OrderItemInfos
            orderItem={order.orderItems}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isLastItem={isLastItem}
          />
          <div
            className={styles.infoContainer}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            <BsInfoLg />
          </div>
          <Link
            className={styles.buttonContainer}
            href={`/pedidos/${order.id}`}
            onClick={() => setIsLoading(true)}
          >
            <CgDetailsMore color={"#000000"} />
            <span className={styles.buttonText}>Detalhes</span>
          </Link>
        </td>
      </tr>
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
    case "EmProducao":
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
        border: "1px solid var(--shipped-color)",
        backgroundColor: "var(--shipped-bg)",
      };
    case "Disponivel":
      return {
        ...defaultStyle,
        color: "var(--available-color)",
        border: "1px solid var(--available-color)",
        backgroundColor: "var(--available-bg)",
      };
    default:
      return {
        ...defaultStyle,
      };
  }
}

function isLastOrder(orders: Order[], currentOrderIndex: number) {
  return orders.length - 3 >= currentOrderIndex;
}

export default OrderList;
