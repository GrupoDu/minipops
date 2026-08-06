import PageHeader from "@/components/pageHeader";
import Breadcrumb from "@/components/breadcrumb";

async function EditSupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return (
      <main>
        <PageHeader
          title={"Fornecedor"}
          description={"Informações do fornecedor"}
        />
        <Breadcrumb />
        <div className="mainContent">
          <h4>Fornecedor não encontrado</h4>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title={"Fornecedor"}
        description={"Informações do fornecedor"}
      />
      <Breadcrumb />
      <div className="mainContent">
        <h4>{slug}</h4>
      </div>
    </main>
  );
}

export default EditSupplierPage;
