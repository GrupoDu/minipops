"use client";

import styles from "./styles.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import useFetch from "@/hooks/useFetch";
import { FaEye } from "react-icons/fa6";
import { EmptyList } from "@/components/emptyList";
import { Pagination } from "@/components/pagination";
import { LoadingBlock } from "@/components/loadingBlock";
import FilterContainer from "@/components/filterContainer";
import ListTemplate from "@/components/listTemplate";
import InputText from "@/components/inputs/inputText";
import { Supplier } from "@/types/suppliers.interface";
import { isListPopulated } from "@/utils/isListPopulated";
import { landlineFormatter } from "@/utils/landlineFormatter";
import { setQueryParams } from "@/utils/setQueryParams";
import phoneFormatter from "@/utils/phoneFormatter";
import { SUPPLIER_TABLE_HEADS } from "@/constants/tableHeads.constant";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";

export const SuppliersList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [cnpjFilter, setCnpjFilter] = useState("");
  const { setIsLoading, isLoading } = useLoading();
  const hasFilters = searchParams.size > 2;
  const endpoint = `supplier${hasFilters ? `/filter` : `/offset`}`;
  const { data: suppliers, maxPages } = useFetch<Supplier[]>(
    endpoint,
    TRACK_PARAMS,
  );

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
    setCnpjFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "cnpj",
      value,
    });
    router.push(`${pathname}?${params}`);
  };

  return (
    <>
      <FilterContainer isFiltersAvailable={true}>
        <InputText
          type={"text"}
          label={"Nome"}
          filterTarget={"name"}
          isSearch={true}
          placeholder={"Fornecedor"}
          value={nameFilter}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <InputText
          type={"text"}
          label={"Email"}
          filterTarget={"email"}
          isSearch={true}
          placeholder={"Email"}
          value={emailFilter}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <InputText
          type={"text"}
          label={"Cnpj"}
          filterTarget={"cnpj"}
          isSearch={true}
          placeholder={"CNPJ"}
          value={cnpjFilter}
          onChange={(e) => handleCnpjChange(e.target.value)}
        />
      </FilterContainer>
      {isLoading ? (
        <LoadingBlock />
      ) : isListPopulated(suppliers) ? (
        <>
          <ListTemplate heads={SUPPLIER_TABLE_HEADS}>
            {suppliers?.map((supplier) => (
              <tr key={supplier.supplierUuid}>
                <td>{supplier.tradingName}</td>
                <td>{supplier.supplierCnpj}</td>
                <td>{supplier.supplierEmail || "Email não fornecido"}</td>
                <td className={styles.contacts}>
                  <span>{phoneFormatter(supplier.supplierPhone)}</span>
                  <span>{landlineFormatter(supplier.supplierLandline)}</span>
                </td>
                <td className={styles.buttonContainer}>
                  <Link
                    className={styles.linkButton}
                    href={`/fornecedores/${supplier.supplierUuid}`}
                    onClick={() => setIsLoading(true)}
                  >
                    <FaEye />
                    <span>Visualizar</span>
                  </Link>
                </td>
              </tr>
            ))}
          </ListTemplate>
          <Pagination maxPage={maxPages} />
        </>
      ) : (
        <EmptyList targetName={"fornecedor"} />
      )}
    </>
  );
};
