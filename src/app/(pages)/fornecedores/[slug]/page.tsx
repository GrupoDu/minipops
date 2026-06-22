import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import Breadcrumb from "@/components/breadcrumb";
import { getSupplier } from "@/utils/getSupplier";
import { CgProfile } from "react-icons/cg";
import BackButton from "@/components/backButton";
import { SupplierModal } from "@/components/supplierModal";
import { ActionButtonsSupplier } from "@/components/actionButtonsSupplier";
import { SupplierInfos } from "@/components/supplierInfos";

async function SupplierInfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supplier = await getSupplier(slug);

  if (!supplier) {
    return (
      <div className={"pageContainer"}>
        <PageHeader
          title={"Fornecedor"}
          description={"Informações do fornecedor"}
        />
        <Breadcrumb />
        <div className="mainContent">
          <div className={styles.notFound}>
            <CgProfile className={styles.supplierLogo} />
            <div className={styles.text}>
              <h3>Fornecedor não encontrado</h3>
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SupplierModal slug={slug} />
      <div className={"pageContainer"}>
        <PageHeader
          title={"Fornecedor"}
          description={"Informações do fornecedor"}
        />
        <Breadcrumb />
        <div className="mainContent">
          <ActionButtonsSupplier slug={slug} />
          <SupplierInfos supplier={supplier} />
        </div>
      </div>
    </>
  );
}

export default SupplierInfoPage;
