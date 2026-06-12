import PageHeader from "@/components/pageHeader";
import TableHeader from "@/components/tableHeader";
import FilterContainer from "@/components/filterContainer";
import InputText from "@/components/inputs/inputText";
import { InputDate } from "@/components/inputs/inputDate";
import OrderList from "@/components/orderList";

function OrdersPage() {
  const tableHeaderTitles = [
    "Pedido",
    "Cliente",
    "Obra",
    "Status",
    "Total",
    "Ações",
  ];

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
        <FilterContainer>
          <InputText
            type={"text"}
            label={"Cliente"}
            filterTarget={"client"}
            isSearch={true}
            placeholder={"Pesquisar cliente"}
          />
          <InputDate label={"Prazo"} />
        </FilterContainer>
        <OrderList />
      </div>
    </div>
  );
}

export default OrdersPage;
