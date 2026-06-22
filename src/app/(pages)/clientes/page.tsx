import PageHeader from "@/components/pageHeader";
import ClientsList from "@/components/clientsList";
import InputText from "@/components/inputs/inputText";
import FilterContainer from "@/components/filterContainer";

function CustomersPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title="Clientes"
        description={"Informações de clientes"}
        addButton={"Novo cliente"}
      />
      <div className={"mainContent"}>
        <ClientsList />
      </div>
    </div>
  );
}

export default CustomersPage;
