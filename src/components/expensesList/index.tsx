"use client";

import styles from "./styles.module.scss";
import useFetch from "@/hooks/useFetch";
import { Expenses } from "@/types/expenses.type";
import { useState } from "react";
import { priceFormatter } from "@/utils/priceFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";

export const ExpensesList = () => {
  const { data: fetchedExpenses } = useFetch<Expenses[]>("expenses");
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const supplier = searchParams.get("supplier");
  const tableHeads = ["Descrição", "Preço", "Quantidade", "Fornecedor", "Data"];
  const [filteredExpenses, setFilteredExpenses] = useState<Expenses[]>([]);

  const displayExpenses = (expenses: Expenses[] | undefined) => {
    return expenses?.map((expense) => (
      <tr key={expense.expense_uuid}>
        <td>{expense.description}</td>
        <td>{priceFormatter(expense.price)}</td>
        <td>{expense.amount}</td>
        <td
          style={expense.suppliers ? {} : { opacity: 0.6, fontStyle: "italic" }}
        >
          {expense.suppliers ? (
            <Link href={`/fornecedores/${expense.suppliers?.supplier_uuid}`}>
              {expense.suppliers.supplier_name}
            </Link>
          ) : (
            "Fornecedor não informado"
          )}
        </td>
        <td>{dateFormatter(expense.date)}</td>
      </tr>
    ));
  };

  if (!fetchedExpenses || fetchedExpenses.length === 0)
    return <EmptyList targetName={"gasto"} />;

  return (
    <ListTemplate heads={tableHeads}>
      {filteredExpenses.length > 0
        ? displayExpenses(filteredExpenses)
        : displayExpenses(fetchedExpenses)}
    </ListTemplate>
  );
};
