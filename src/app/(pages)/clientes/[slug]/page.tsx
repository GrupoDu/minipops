import PageHeader from "@/components/pageHeader";
import styles from "./page.module.scss";
import Breadcrumb from "@/components/breadcrumb";
import { ClientContainer } from "@/components/clientContainer";

export const dynamic = "force-dynamic";

async function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Clientes"} description={"Informações de clientes"} />
      <Breadcrumb />
      <div className={"mainContent"}>
        <ClientContainer client_uuid={slug} />
      </div>
    </div>
  );
}

export default ClientPage;
