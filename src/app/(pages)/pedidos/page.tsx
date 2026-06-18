import PageHeader from "@/components/pageHeader";
import OrderList from "@/components/orderList";

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
        <OrderList />
      </div>
    </div>
  );
}

export default OrdersPage;
