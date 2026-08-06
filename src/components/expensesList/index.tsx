"use client";

import useFetch from "@/hooks/useFetch";
import { Expenses } from "@/types/expenses.interface";
import { useState } from "react";
import { priceFormatter } from "@/utils/priceFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";
import { Pagination } from "@/components/pagination";
import { InputDate } from "@/components/inputs/inputDate";
import FilterContainer from "@/components/filterContainer";
import InputText from "../inputs/inputText";
import { LoadingBlock } from "@/components/loadingBlock";
import { useLoading } from "@/hooks/useLoading";

export const ExpensesList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const tableHeads = ["Descrição", "Preço", "Quantidade", "Fornecedor", "Data"];
  const { isLoading, setIsLoading } = useLoading();
  const { data: expenses, maxPages } = useFetch<Expenses[]>(
    `expense/offset?page=${page}&pageSize=${pageSize}`,
  );
  const [filteredExpenses, setFilteredExpenses] = useState<Expenses[]>([]);
  const isListPopulated = (
    expenses: Expenses[] | undefined,
  ): expenses is Expenses[] => !!expenses && expenses.length > 0;

  if (!page) return <h2>Página não encontrada</h2>;

  const displayExpenses = (expenses: Expenses[] | undefined) => {
    return expenses?.map((expense) => (
      <tr key={expense.expenseUuid}>
        <td>{expense.description}</td>
        <td>{priceFormatter(expense.price)}</td>
        <td>{expense.amount}</td>
        <td
          style={expense.supplier ? {} : { opacity: 0.6, fontStyle: "italic" }}
        >
          {expense.supplier ? (
            <Link href={`/fornecedores/${expense.supplier?.supplierUuid}`}>
              {expense.supplier.companyName}
            </Link>
          ) : (
            "Fornecedor não informado"
          )}
        </td>
        <td>{dateFormatter(expense.date)}</td>
      </tr>
    ));
  };

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
        <InputDate label={"Data"} />
      </FilterContainer>
      {isLoading ? (
        <LoadingBlock />
      ) : isListPopulated(expenses) ? (
        <>
          <ListTemplate heads={tableHeads}>
            {filteredExpenses.length > 0
              ? displayExpenses(filteredExpenses)
              : displayExpenses(expenses)}
          </ListTemplate>
          <Pagination maxPage={maxPages} />
        </>
      ) : (
        <EmptyList targetName={"gasto"} />
      )}
    </>
  );
};
