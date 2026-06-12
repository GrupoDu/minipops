"use client";

import styles from "./styles.module.scss";
import { InputDate } from "@/components/inputs/inputDate";
import InputText from "@/components/inputs/inputText";
import InputSelect from "@/components/inputs/inputSelect";
import { useState } from "react";
import { ExpensesCreate } from "@/types/expenses.type";
import { Suppliers } from "@/types/suppliers.type";
import useFetch from "@/hooks/useFetch";

export const ExpensesForm = () => {
  const { data: suppliers } = useFetch<Suppliers[]>("suppliers");
  const suppliersOptions = suppliers?.map((supplier) => ({
    label: supplier.supplier_name,
    value: supplier.supplier_uuid,
  }));
  const [expense, setExpense] = useState<ExpensesCreate>({
    amount: 0,
    price: 0,
    description: "",
    date: new Date().toLocaleDateString(),
    supplier_uuid: "",
  });

  return (
    <form className={"formContainer"}>
      <div className={styles.formTitle}>
        <h5>Registrar gasto</h5>
      </div>
      <div className={styles.formFields}>
        <InputDate
          label={"Data"}
          value={expense.date.toString()}
          onChange={(e) =>
            setExpense((prev) => ({
              ...prev,
              date: new Date(e.target.value).toLocaleDateString(),
            }))
          }
        />
        <div className={styles.grid}>
          <InputText label={"Descrição"} type={"text"} />
          <InputText label={"Preço"} type={"text"} />
          <InputText label={"Quantidade"} type={"text"} />
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
    </form>
  );
};
