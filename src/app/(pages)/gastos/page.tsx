import PageHeader from "@/components/pageHeader";
import { ExpensesList } from "@/components/expensesList";

function ExpensesPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Gastos"}
        description={"Detalhes sobre gastos e despesas"}
        addButton={"Adicionar gasto"}
      />
      <div className="mainContent">
        <ExpensesList />
      </div>
    </div>
  );
}

export default ExpensesPage;
