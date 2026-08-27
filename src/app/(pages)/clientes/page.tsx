import PageHeader from "@/components/pageHeader";
import ClientsList from "@/components/clientsList";

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
