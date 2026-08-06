"use client";

import styles from "./styles.module.scss";
import { InputDate } from "@/components/inputs/inputDate";
import InputText from "@/components/inputs/inputText";
import InputSelect from "@/components/inputs/inputSelect";
import React, { useState } from "react";
import { ExpensesCreate } from "@/types/expenses.interface";
import { Supplier } from "@/types/suppliers.interface";
import useFetch from "@/hooks/useFetch";
import DefaultButton from "@/components/defaultButton";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BackButton from "@/components/backButton";
import { centsToNumber } from "@/utils/centsToNumber";
import { centsFormatter } from "@/utils/centsFormatter";
import { WarningObs } from "@/components/WarningObs";

export const ExpensesForm = () => {
  const { data: suppliers } = useFetch<Supplier[]>("supplier");
  const suppliersOptions = suppliers?.map((supplier) => ({
    label: supplier.companyName,
    value: supplier.supplierUuid,
  }));
  const router = useRouter();
  const [expense, setExpense] = useState<ExpensesCreate>({
    amount: 0,
    price: "",
    description: "",
    date: new Date().toISOString(),
    supplierUuid: "",
  });

  const handleExpenseSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/expense", {
        ...expense,
        date: new Date(expense.date),
        price: centsToNumber(expense.price),
        supplierUuid: expense.supplierUuid === "" ? null : expense.supplierUuid,
      });

      const message = await response.data.message;

      router.push("/gastos?page=1&pageSize=7");
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
      <WarningObs
        warning={
          "Os centavos no preço são obrigatórios, e devem ser separados por vírgula. Ex: 100,00"
        }
        style={{ margin: ".6rem" }}
      />
      <div className={styles.formFields}>
        <InputDate
          label={"Data"}
          required={true}
          value={expense.date}
          onChange={(e) => {
            setExpense((prev) => ({
              ...prev,
              date: e.target.value.split("T")[0],
            }));
          }}
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
            value={expense.supplierUuid || ""}
            onChange={(e) =>
              setExpense((prev) => ({ ...prev, supplierUuid: e.target.value }))
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
