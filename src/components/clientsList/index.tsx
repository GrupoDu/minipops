"use client";

import styles from "./styles.module.scss";
import DefaultButton from "@/components/defaultButton";
import phoneFormatter from "@/utils/phoneFormatter";
import { EmptyList } from "@/components/emptyList";
import useFetch from "@/hooks/useFetch";
import ListTemplate from "@/components/listTemplate";
import { Pagination } from "@/components/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import { LoadingBlock } from "@/components/loadingBlock";
import InputText from "../inputs/inputText";
import FilterContainer from "@/components/filterContainer";
import { landlineFormatter } from "@/utils/landlineFormatter";
import { CgEye } from "react-icons/cg";
import { cnpjFormatter } from "@/utils/cnpjFormatter";
import { cpfFormatter } from "@/utils/cpfFormatter";
import { Client } from "@/types/client.interface";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { CUSTOMER_TABLE_HEADS } from "@/constants/tableHeads.constant";
import { useState } from "react";
import { setQueryParams } from "@/utils/setQueryParams";

function cpfCnpjDisplay(value: string) {
  if (value.length === 14) return cnpjFormatter(value);

  return cpfFormatter(value);
}

const ClientsList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [cnpjFilter, setCnpjFilter] = useState("");
  const { isLoading } = useLoading();
  const hasFilters = searchParams.size > 2;
  const endpoint = `client${hasFilters ? "/filter" : "/offset"}`;
  const { data: clients, maxPages } = useFetch<Client[]>(
    endpoint,
    TRACK_PARAMS,
  );

  const isListPopulated = !!clients && clients.length > 0;

  const handleNameChange = (value: string) => {
    setNameFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "tradingName",
      value,
    });
    router.push(`${pathname}?${params}`);
  };
  const handleEmailChange = (value: string) => {
    setEmailFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "email",
      value,
    });
    router.push(`${pathname}?${params}`);
  };
  const handleCnpjChange = (value: string) => {
    const formatedValue = value.replace(/\D/g, "");
    setCnpjFilter(formatedValue);
    const params = setQueryParams({
      searchParams,
      key: "cnpj",
      value: formatedValue,
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <>
      <FilterContainer isFiltersAvailable={true}>
        <InputText
          type={"text"}
          label={"Nome"}
          placeholder={"Pesquisar nome do cliente"}
          isSearch={true}
          filterTarget={"cliente"}
          onChange={(e) => handleNameChange(e.target.value)}
          value={nameFilter}
        />
        <InputText
          type={"text"}
          label={"Email"}
          placeholder={"Pesquisar email do cliente"}
          isSearch={true}
          filterTarget={"email"}
          onChange={(e) => handleEmailChange(e.target.value)}
          value={emailFilter}
        />
        <InputText
          type={"text"}
          label={"CNPJ"}
          placeholder={"CNPJ do cliente"}
          isSearch={true}
          filterTarget={"cnpj"}
          onChange={(e) => handleCnpjChange(e.target.value)}
          value={cnpjFilter}
        />
      </FilterContainer>
      {isLoading ? (
        <LoadingBlock />
      ) : isListPopulated ? (
        <>
          <ListTemplate heads={CUSTOMER_TABLE_HEADS}>
            {clients?.map((client) => (
              <tr key={client.uuid}>
                <td>{client.tradingName}</td>
                <td>{cpfCnpjDisplay(client.cnpjCpf)}</td>
                <td>{client.email || "Email não fornecido"}</td>
                <td className={"phone"}>
                  <div className={styles.landPhoneContainer}>
                    <span>
                      {client.phone
                        ? phoneFormatter(client.phone)
                        : "Telefone não informado"}
                    </span>
                    <span className={!client.landline ? "isNotInformed" : ""}>
                      {client.landline
                        ? landlineFormatter(client.landline)
                        : "Fixo não informado"}
                    </span>
                  </div>
                </td>
                <td className={styles.buttonContainer}>
                  <DefaultButton
                    prefetch={false}
                    type={"button"}
                    isLink={true}
                    href={`/clientes/${client.uuid}`}
                  >
                    <CgEye />
                    <span>Visualizar</span>
                  </DefaultButton>
                </td>
              </tr>
            ))}
          </ListTemplate>
          <Pagination maxPage={maxPages} />
        </>
      ) : (
        <EmptyList targetName={"cliente"} />
      )}
    </>
  );
};

export default ClientsList;
