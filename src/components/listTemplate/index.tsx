"use client";

import styles from "./styles.module.scss";
import FilterContainer from "@/components/filterContainer";
import InputText from "@/components/inputs/inputText";
import { useState } from "react";
import InputSelect from "@/components/inputs/inputSelect";
import OrderList from "@/components/orderList";
import OrderProvider from "@/providers/order.provider";

const ListTemplate = () => {
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const selectValues = [
    {
      value: "Pendente",
      label: "Pendente",
    },
    {
      value: "Em produção",
      label: "Em produção",
    },
    {
      value: "Concluído",
      label: "Concluído",
    },
    {
      value: "Enviado",
      label: "Enviado",
    },
    {
      value: "Disponível",
      label: "Disponível",
    },
    {
      value: "Cancelado",
      label: "Cancelado",
    },
  ];

  return (
    <div className={styles.listTemplateContainer}>
      <FilterContainer>
        <InputText
          type={"date"}
          label={"Data de criação"}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <InputSelect
          options={selectValues}
          placeholder={"Todos os pedidos"}
          label={"Status"}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </FilterContainer>
      <OrderProvider>
        <OrderList />
      </OrderProvider>
    </div>
  );
};

export default ListTemplate;
