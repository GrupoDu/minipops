"use client";

import useFetch from "@/hooks/useFetch";
import { Expenses } from "@/types/expenses.interface";
import { useState } from "react";
import { priceFormatter } from "@/utils/priceFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ListTemplate from "@/components/listTemplate";
import { EmptyList } from "@/components/emptyList";
import { Pagination } from "@/components/pagination";
import FilterContainer from "@/components/filterContainer";
import InputText from "../inputs/inputText";
import { LoadingBlock } from "@/components/loadingBlock";
import { useLoading } from "@/hooks/useLoading";
import { hasFilters } from "@/utils/hasFilters";
import { TRACK_PARAMS } from "@/constants/trackParams.constant";
import { isListPopulated } from "@/utils/isListPopulated";
import { EXPENSE_TABLE_HEADS } from "@/constants/tableHeads.constant";
import InputSelect from "@/components/inputs/inputSelect";
import { MONTH_OPTIONS } from "@/constants/monthsOptions.constant";
import { extractOptionsArray } from "@/utils/extractOptionsArray";
import { setQueryParams } from "@/utils/setQueryParams";

function isValueNegative(value: number) {
  return value < 0;
}

export const ExpensesList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [nameFilter, setNameFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [lessThan, setLessThanFilter] = useState(0);
  const [greaterThan, setGreaterThanFilter] = useState(0);
  const page = searchParams.get("page");
  const { isLoading } = useLoading();
  const endpoint = `expense${hasFilters(searchParams) ? "/filter" : "/offset"}`;
  const { data: expenses, maxPages } = useFetch<Expenses[]>(
    endpoint,
    TRACK_PARAMS,
  );

  if (!page) return <h2>Página não encontrada</h2>;

  const displayExpenses = (expenses: Expenses[] | undefined) => {
    return expenses?.map((expense) => (
      <tr key={expense.expenseUuid}>
        <td>{expense.description}</td>
        <td>{priceFormatter(expense.price)}</td>
        <td>{expense.amount} und.</td>
        <td
          style={expense.supplier ? {} : { opacity: 0.6, fontStyle: "italic" }}
        >
          {expense.supplier ? (
            <Link href={`/fornecedores/${expense.supplier?.supplierUuid}`}>
              {expense.supplier.tradingName}
            </Link>
          ) : (
            "Fornecedor não informado"
          )}
        </td>
        <td>{dateFormatter(expense.date)}</td>
      </tr>
    ));
  };

  const handleNameChange = (value: string) => {
    setNameFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "tradingName",
      value,
    });
    router.push(`${pathname}?${params}`);
  };
  const handleMonthChange = (value: string) => {
    setMonthFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "month",
      value,
    });
    router.push(`${pathname}?${params}`);
  };
  const handleLessThanChange = (value: number) => {
    if (isValueNegative(value)) return;

    setLessThanFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "lessThan",
      value: value.toString().replace(/\D/g, ""),
    });
    router.push(`${pathname}?${params}`);
  };
  const handleGreaterThanChange = (value: number) => {
    if (isValueNegative(value)) return;

    setGreaterThanFilter(value);
    const params = setQueryParams({
      searchParams,
      key: "greaterThan",
      value: value.toString().replace(/\D/g, ""),
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
          onChange={(e) => handleNameChange(e.target.value)}
          value={nameFilter}
        />
        <InputSelect
          label={"Mês"}
          options={extractOptionsArray(MONTH_OPTIONS)}
          filterTarget={"month"}
          placeholder={"Pesquisar por mês"}
          onChange={(e) => handleMonthChange(e.target.value)}
          value={monthFilter}
        />
        <InputText
          type={"number"}
          label={"Valor menor que:"}
          filterTarget={"lessThan"}
          placeholder={"R$ 300,00"}
          onChange={(e) => handleLessThanChange(Number(e.target.value))}
          value={lessThan.toString()}
        />
        <InputText
          type={"number"}
          label={"Valor maior que:"}
          filterTarget={"greaterThan"}
          placeholder={"R$ 100,00"}
          onChange={(e) => handleGreaterThanChange(Number(e.target.value))}
          value={greaterThan.toString()}
        />
      </FilterContainer>
      {isLoading ? (
        <LoadingBlock />
      ) : isListPopulated(expenses) ? (
        <>
          <ListTemplate heads={EXPENSE_TABLE_HEADS}>
            {displayExpenses(expenses)}
          </ListTemplate>
          <Pagination maxPage={maxPages} />
        </>
      ) : (
        <EmptyList targetName={"gasto"} />
      )}
    </>
  );
};
