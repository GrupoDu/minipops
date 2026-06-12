"use client";

import styles from "./styles.module.scss";
import { Client } from "@/types/client.interface";
import DefaultButton from "@/components/defaultButton";
import phoneFormatter from "@/utils/phoneFormatter";
import { EmptyList } from "@/components/emptyList";
import useFetch from "@/hooks/useFetch";
import ListTemplate from "@/components/listTemplate";
import { Pagination } from "@/components/pagination";
import { useSearchParams } from "next/navigation";

const ClientsList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data } = useFetch<{ clients: Client[]; max_pages: number }>(
    `clients?page=${page}`,
  );
  const tableHeads = ["Nome", "CNPJ", "Email", "Contato", "Ações"];

  const clients = data?.clients;
  const maxPage = data?.max_pages || 1;

  if (!clients || clients.length === 0)
    return <EmptyList targetName={"cliente"} />;

  return (
    <>
      <ListTemplate heads={tableHeads}>
        {clients?.map((client) => (
          <tr key={client.client_uuid}>
            <td>{client.client_name}</td>
            <td>{client.client_cnpj}</td>
            <td>{client.client_email || "Email não fornecido"}</td>
            <td className={"phone"}>
              <span>{phoneFormatter(client.client_phone)}</span>
              <span className={!client.client_landline ? "isNotInformed" : ""}>
                {client.client_landline
                  ? phoneFormatter(client.client_landline)
                  : "Fixo não informado"}
              </span>
            </td>
            <td className={styles.buttonContainer}>
              <DefaultButton
                type={"button"}
                isLink={true}
                href={`/clientes/${client.client_uuid}`}
              >
                Visualizar
              </DefaultButton>
            </td>
          </tr>
        ))}
      </ListTemplate>
      <Pagination maxPage={maxPage} />
    </>
  );
};

export default ClientsList;
