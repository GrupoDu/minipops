"use client";

import styles from "./styles.module.scss";
import { InputDate } from "@/components/inputs/inputDate";
import InputText from "@/components/inputs/inputText";
import InputSelect from "@/components/inputs/inputSelect";
import React, { useState } from "react";
import { ExpensesCreate } from "@/types/expenses.type";
import { Suppliers } from "@/types/suppliers.type";
import useFetch from "@/hooks/useFetch";
import DefaultButton from "@/components/defaultButton";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BackButton from "@/components/backButton";
import { centsToNumber } from "@/utils/centsToNumber";
import { centsFormatter } from "@/utils/centsFormatter";
import { CiCircleInfo } from "react-icons/ci";

export const ExpensesForm = () => {
  const { data: suppliers } = useFetch<Suppliers[]>("suppliers");
  const suppliersOptions = suppliers?.map((supplier) => ({
    label: supplier.supplier_name,
    value: supplier.supplier_uuid,
  }));
  const router = useRouter();
  const [expense, setExpense] = useState<ExpensesCreate>({
    amount: 0,
    price: "",
    description: "",
    date: new Date().toISOString(),
    supplier_uuid: "",
  });

  const handleExpenseSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/expenses", {
        ...expense,
        date: new Date(expense.date),
        price: centsToNumber(expense.price),
        supplier_uuid:
          expense.supplier_uuid === "" ? null : expense.supplier_uuid,
      });

      const message = await response.data.message;

      router.push("/gastos?page=1&per_page=10");
      toast.success(message);
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={(e) => handleExpenseSubmit(e)} className={"formContainer"}>
      <div className={styles.formTitle}>
        <h5>Registrar gasto</h5>
      </div>
      <div className={styles.observation}>
        <CiCircleInfo className={styles.obsIcon} />
        <span>
          Os centavos no preço são obrigatórios, e devem ser separados por
          vírgula. Ex: 100,00
        </span>
      </div>
      <div className={styles.formFields}>
        <InputDate
          label={"Data"}
          required={true}
          value={expense.date}
          onChange={(e) =>
            setExpense((prev) => ({
              ...prev,
              date: new Date(e.target.value).toISOString().split("T")[0],
            }))
          }
        />
        <div className={styles.grid}>
          <InputText
            label={"Descrição"}
            required={true}
            type={"text"}
            onChange={(e) =>
              setExpense((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <InputText
            label={"Preço"}
            type={"text"}
            placeholder={"Ex: 100,00"}
            required={true}
            value={expense.price}
            onChange={(e) =>
              setExpense((prev) => ({
                ...prev,
                price: centsFormatter(e.target.value),
              }))
            }
          />
          <InputText
            label={"Quantidade"}
            type={"number"}
            required={true}
            onChange={(e) =>
              setExpense((prev) => ({
                ...prev,
                amount: parseInt(e.target.value, 10),
              }))
            }
          />
          <InputSelect
            label={"Fornecedor"}
            options={suppliersOptions || []}
            value={expense.supplier_uuid || ""}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, supplier_uuid: e.target.value }))
            }
          />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <BackButton />
        <DefaultButton type={"submit"}>Registrar</DefaultButton>
      </div>
    </form>
  );
};
