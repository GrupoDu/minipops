import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import ListTemplate from "@/components/listTemplate";

function OrdersPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Pedidos"}
        description={
          "Acompanhe pedidos por status, período, cliente e fornecedor."
        }
      />
      <div className={"mainContent"}>
        <ListTemplate />
      </div>
    </div>
  );
}

export default OrdersPage;
