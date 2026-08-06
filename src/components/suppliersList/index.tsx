"use client";

import styles from "./styles.module.scss";
import ListTemplate from "@/components/listTemplate";
import { Supplier } from "@/types/suppliers.interface";
import { useSearchParams } from "next/navigation";
import { EmptyList } from "@/components/emptyList";
import Link from "next/link";
import phoneFormatter from "@/utils/phoneFormatter";
import { FaEye } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Pagination } from "@/components/pagination";
import { useLoading } from "@/hooks/useLoading";
import { LoadingBlock } from "@/components/loadingBlock";
import FilterContainer from "@/components/filterContainer";
import InputText from "@/components/inputs/inputText";
import { landlineFormatter } from "@/utils/landlineFormatter";

export const SuppliersList = () => {
  const searchParams = useSearchParams();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const page = searchParams.get("page") || 1;
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const [maxPage, setMaxPage] = useState(0);
  const { setIsLoading, isLoading } = useLoading();
  const filteredSuppliers = suppliers?.filter(
    (supplier) =>
      (name ? supplier.tradingName === name : true) &&
      (email ? supplier.supplierEmail === email : true),
  );
  const isFilterActive = !!name || !!email;
  const displayList = isFilterActive ? filteredSuppliers : suppliers;
  const isListPopulated = !!displayList && displayList.length > 0;
  const tablesHeads = ["Fornecedor", "CNPJ", "Email", "Contatos", "Ações"];

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await api.get(
          `/supplier/offset?page=${page}&pageSize=7`,
        );

        const data = await response.data;

        setSuppliers(data.data);
        setMaxPage(data.maxPages);
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <FilterContainer>
        <InputText
          type={"text"}
          label={"Nome"}
          filterTarget={"name"}
          isSearch={true}
          placeholder={"Fornecedor"}
        />
        <InputText
          type={"text"}
          label={"Email"}
          filterTarget={"email"}
          isSearch={true}
          placeholder={"Email"}
        />
      </FilterContainer>
      {isLoading ? (
        <LoadingBlock />
      ) : isListPopulated ? (
        <>
          <ListTemplate heads={tablesHeads}>
            {displayList.map((supplier) => (
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
          <Pagination maxPage={maxPage} />
        </>
      ) : (
        <EmptyList targetName={"fornecedor"} />
      )}
    </>
  );
};
