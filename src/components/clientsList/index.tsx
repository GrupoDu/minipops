"use client";

import useClients from "@/hooks/useClients";
import styles from "./styles.module.scss";
import { useState } from "react";
import FilterContainer from "@/components/filterContainer";
import InputText from "@/components/inputs/inputText";
import ListTemplate from "@/components/listTemplate";
import { Client } from "@/types/client.interface";
import TableHeader from "@/components/tableHeader";
import DefaultButton from "@/components/defaultButton";

const ClientsList = () => {
  const { clients, status, error } = useClients();
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const tableTitles = ["Nome", "CNPJ", "Email", "Contato", "Ações"];

  return (
    <div className={styles.clientsListContainer}>
      <FilterContainer>
        <InputText
          type={"text"}
          label={"Nome"}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <InputText
          type={"text"}
          label={"Email"}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
      </FilterContainer>
      <div className="listContainer">
        <TableHeader titles={tableTitles} />
        <ListTemplate>{displayClients(clients)}</ListTemplate>
      </div>
    </div>
  );
};

function displayClients(clients?: Client[]) {
  if (!clients) {
    return <div className={styles.fetchError}>Erro ao carregar clientes.</div>;
  }

  return clients?.map((client) => (
    <li key={client.client_uuid} className={`listItem ${styles.itemList}`}>
      <span>{client.client_name}</span>
      <span>{client.client_cnpj}</span>
      <span>{client.client_email || "Email não fornecido"}</span>
      <span>{client.client_phone}</span>
      <div className={styles.buttonContainer}>
        <DefaultButton type={"button"}>Visualizar</DefaultButton>
      </div>
    </li>
  ));
}

export default ClientsList;
