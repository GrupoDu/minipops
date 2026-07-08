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
import { useLoading } from "@/hooks/useLoading";
import { LoadingBlock } from "@/components/loadingBlock";
import InputText from "../inputs/inputText";
import FilterContainer from "@/components/filterContainer";
import { landlineFormatter } from "@/utils/landlineFormatter";
import { CgEye } from "react-icons/cg";
import { cnpjFormatter } from "@/utils/cnpjFormatter";

const ClientsList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { isLoading, setIsLoading } = useLoading();
  const { data } = useFetch<{ clients: Client[]; max_pages: number }>(
    `clients?page=${page}`,
  );
  const tableHeads = ["Nome", "CNPJ", "Email", "Contato", "Ações"];

  const clients = data?.clients;
  const maxPage = data?.max_pages || 1;
  const isListPopulated = !!clients && clients.length > 0;

  return (
    <>
      <FilterContainer>
        <InputText
          type={"text"}
          label={"Nome"}
          placeholder={"Pesquisar nome do cliente"}
          isSearch={true}
          filterTarget={"cliente"}
        />
        <InputText
          type={"text"}
          label={"Email"}
          placeholder={"Pesquisar email do cliente"}
          isSearch={true}
          filterTarget={"email"}
        />
      </FilterContainer>
      {isLoading ? (
        <LoadingBlock />
      ) : isListPopulated ? (
        <>
          <ListTemplate heads={tableHeads}>
            {clients?.map((client) => (
              <tr key={client.client_uuid}>
                <td>{client.client_name}</td>
                <td>{cnpjFormatter(client.client_cnpj)}</td>
                <td>{client.client_email || "Email não fornecido"}</td>
                <td className={"phone"}>
                  <div className={styles.landPhoneContainer}>
                    <span>{phoneFormatter(client.client_phone)}</span>
                    <span
                      className={!client.client_landline ? "isNotInformed" : ""}
                    >
                      {client.client_landline
                        ? landlineFormatter(client.client_landline)
                        : "Fixo não informado"}
                    </span>
                  </div>
                </td>
                <td className={styles.buttonContainer}>
                  <DefaultButton
                    prefetch={false}
                    type={"button"}
                    isLink={true}
                    href={`/clientes/${client.client_uuid}`}
                  >
                    <CgEye />
                    <span>Visualizar</span>
                  </DefaultButton>
                </td>
              </tr>
            ))}
          </ListTemplate>
          <Pagination maxPage={maxPage} />
        </>
      ) : (
        <EmptyList targetName={"cliente"} />
      )}
    </>
  );
};

export default ClientsList;
