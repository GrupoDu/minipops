import PageHeader from "@/components/pageHeader";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="pageContainer">
      <PageHeader
        title="Pedidos"
        description="Acompanhe pedidos por status, período, cliente e fornecedor."
      />

      <div className="mainContent"></div>
    </div>
  );
}
