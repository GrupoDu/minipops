import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { JSX } from "react";
import { InputDate } from "@/components/inputs/inputDate";
import OrderForm from "@/components/forms/orderForm";
import ClientsProvider from "@/providers/clients.provider";
import ProductsProvider from "@/providers/products.provider";

function AddOrderPage() {
  const formSteps: JSX.Element[] = [];

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
