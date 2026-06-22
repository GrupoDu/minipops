"use client";

import useFetch from "@/hooks/useFetch";
import { Expenses, ExpensesPagination } from "@/types/expenses.type";
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
  const per_page = searchParams.get("per_page");
  const tableHeads = ["Descrição", "Preço", "Quantidade", "Fornecedor", "Data"];
  const { isLoading, setIsLoading } = useLoading();
  const { data } = useFetch<ExpensesPagination>(
    `expenses?page=${page}&per_page=${per_page}`,
  );
  const [filteredExpenses, setFilteredExpenses] = useState<Expenses[]>([]);
  const isListPopulated = (
    data: ExpensesPagination | undefined,
  ): data is ExpensesPagination => !!data && data.expenses.length > 0;

  if (!page) return <h2>Página não encontrada</h2>;

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
      ) : isListPopulated(data) ? (
        <>
          <ListTemplate heads={tableHeads}>
            {filteredExpenses.length > 0
              ? displayExpenses(filteredExpenses)
              : displayExpenses(data.expenses)}
          </ListTemplate>
          <Pagination maxPage={data.max_pages} />
        </>
      ) : (
        <EmptyList targetName={"gasto"} />
      )}
    </>
  );
};
