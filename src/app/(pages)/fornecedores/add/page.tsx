import PageHeader from "@/components/pageHeader";
import { SupplierForm } from "@/components/forms/supplierForm";

function AddSupplierPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Adicionar Fornecedor"}
        description={"Adicionar novo fornecedor"}
      />
      <div className="mainContent">
        <SupplierForm />
      </div>
    </div>
  );
}

export default AddSupplierPage;
