import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import ListTemplate from "@/components/listTemplate";
import OrderList from "@/components/orderList";
import OrderProvider from "@/providers/order.provider";

function OrdersPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Pedidos"}
        description={
          "Acompanhe pedidos por status, período, cliente e fornecedor."
        }
        addButton={"Adicionar Pedido"}
      />
      <div className={"mainContent"}>
        <OrderProvider>
          <OrderList />
        </OrderProvider>
      </div>
    </div>
  );
}

export default OrdersPage;
