import PageHeader from "@/components/pageHeader";
import FilterContainer from "@/components/filterContainer";
import InputText from "@/components/inputs/inputText";
import { SuppliersList } from "@/components/suppliersList";

async function SuppliersPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Fornecedores"}
        description={"Detalhes e informações de fornecedores"}
        addButton={"Adicionar fornecedor"}
      />
      <div className="mainContent">
        <SuppliersList />
      </div>
    </div>
  );
}

export default SuppliersPage;
