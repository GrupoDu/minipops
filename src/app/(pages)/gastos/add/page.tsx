import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { ExpensesForm } from "@/components/forms/expensesForm";

function AddExpensesPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Gastos"} description={"Registrar gasto"} />
      <div className="mainContent">
        <ExpensesForm />
      </div>
    </div>
  );
}

export default AddExpensesPage;
