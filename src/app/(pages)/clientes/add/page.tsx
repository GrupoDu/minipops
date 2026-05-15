import PageHeader from "@/components/pageHeader";
import ClientsProvider from "@/providers/clients.provider";
import ClientsList from "@/components/clientsList";
import ClientForm from "@/components/forms/clientForm";

function AddClientPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Clientes"} description={"Adicionar novo cliente"} />
      <div className={"mainContent"}>
        <ClientForm />
      </div>
    </div>
  );
}

export default AddClientPage;
