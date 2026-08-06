"use client";

import styles from "./styles.module.scss";
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
import { cpfFormatter } from "@/utils/cpfFormatter";
import { Customer } from "@/types/customer.interface";

const ClientsList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { isLoading, setIsLoading } = useLoading();
  const { data: customers, maxPages } = useFetch<Customer[]>(
    `customer/offset?page=${page}&pageSize=7`,
  );
  const tableHeads = ["Nome", "CNPJ", "Email", "Contato", "Ações"];

  const maxPage = maxPages;
  const isListPopulated = !!customers && customers.length > 0;
  const cpfCnpjDisplay = (value: string) => {
    if (value.length === 14) return cnpjFormatter(value);

    return cpfFormatter(value);
  };

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
            {customers?.map((customer) => (
              <tr key={customer.customerUuid}>
                <td>{customer.tradingName}</td>
                <td>{cpfCnpjDisplay(customer.customerCnpj)}</td>
                <td>{customer.customerEmail || "Email não fornecido"}</td>
                <td className={"phone"}>
                  <div className={styles.landPhoneContainer}>
                    <span>
                      {customer.customerPhone
                        ? phoneFormatter(customer.customerPhone)
                        : "Telefone não informado"}
                    </span>
                    <span
                      className={
                        !customer.customerLandline ? "isNotInformed" : ""
                      }
                    >
                      {customer.customerLandline
                        ? landlineFormatter(customer.customerLandline)
                        : "Fixo não informado"}
                    </span>
                  </div>
                </td>
                <td className={styles.buttonContainer}>
                  <DefaultButton
                    prefetch={false}
                    type={"button"}
                    isLink={true}
                    href={`/clientes/${customer.customerUuid}`}
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
