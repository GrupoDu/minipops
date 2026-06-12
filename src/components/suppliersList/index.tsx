"use client";

import styles from "./styles.module.scss";
import ListTemplate from "@/components/listTemplate";
import { Suppliers } from "@/types/suppliers.type";
import { useSearchParams } from "next/navigation";
import { EmptyList } from "@/components/emptyList";
import Link from "next/link";
import phoneFormatter from "@/utils/phoneFormatter";
import { FaEye } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Pagination } from "@/components/pagination";

export const SuppliersList = () => {
  const searchParams = useSearchParams();
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
  const page = searchParams.get("page") || 1;
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const [maxPage, setMaxPage] = useState(0);
  const filteredSuppliers = suppliers?.filter(
    (supplier) =>
      (name ? supplier.supplier_name === name : true) &&
      (email ? supplier.supplier_email === email : true),
  );
  const isFilterActive = !!name || !!email;
  const displayList = isFilterActive ? filteredSuppliers : suppliers;
  const isListPopulated = !!displayList && displayList.length > 0;
  const tablesHeads = ["Fornecedor", "CNPJ", "Email", "Contatos", "Ações"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/suppliers?page=${page}`);

        const data = await response.data?.data;

        setSuppliers(data.suppliers);
        setMaxPage(data.max_pages);
      } catch (err) {
        const error = err as Error;
        console.error(error.message);
      }
    };

    fetchData();
  }, [page]);

  if (!isListPopulated) {
    return <EmptyList targetName={"fornecedor"} />;
  }

  if (!isListPopulated) return <EmptyList targetName={"fornecedor"} />;

  return (
    <>
      <ListTemplate heads={tablesHeads}>
        {displayList.map((supplier) => (
          <tr key={supplier.supplier_uuid}>
            <td>{supplier.supplier_name}</td>
            <td>{supplier.supplier_cnpj}</td>
            <td>{supplier.supplier_email}</td>
            <td className={styles.contacts}>
              <span>{phoneFormatter(supplier.supplier_phone)}</span>
              <span>{supplier.supplier_landline}</span>
            </td>
            <td className={styles.buttonContainer}>
              <Link
                className={styles.linkButton}
                href={`/fornecedores/${supplier.supplier_uuid}`}
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
  );
};
