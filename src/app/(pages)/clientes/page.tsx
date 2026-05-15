import PageHeader from "@/components/pageHeader";
import ClientsProvider from "@/providers/clients.provider";
import ClientsList from "@/components/clientsList";
import styles from "./page.module.scss";

function CustomersPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title="Clientes"
        description={"Informações de clientes"}
        addButton={"Novo cliente"}
      />
      <div className={"mainContent"}>
        <ClientsProvider>
          <ClientsList />
        </ClientsProvider>
      </div>
    </div>
  );
}

export default CustomersPage;
