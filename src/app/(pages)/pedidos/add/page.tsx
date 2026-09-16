import PageHeader from "@/components/pageHeader";
import OrderForm from "@/components/forms/orderForm";
import ClientsProvider from "@/providers/clients.provider";
import ProductsProvider from "@/providers/products.provider";

function AddOrderPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Pedidos"}
        description={
          "Acompanhe pedidos por status, período, cliente e fornecedor."
        }
      />
      <div className={"mainContent"}>
        <ProductsProvider>
          <ClientsProvider>
            <OrderForm />
          </ClientsProvider>
        </ProductsProvider>
      </div>
    </div>
  );
}

export default AddOrderPage;
