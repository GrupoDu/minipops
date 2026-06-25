import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { OrderContainer } from "@/components/orderContainer";

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
      <div className="mainContent">
        <OrderContainer order_id={slug} />
      </div>
    </div>
  );
}
