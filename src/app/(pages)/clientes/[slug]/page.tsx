import styles from "./page.module.scss";
import { getClient } from "@/utils/getClient";
import PageHeader from "@/components/pageHeader";
import ClientInfoItem from "@/components/clientInfoItem";
import { AiOutlinePhone } from "react-icons/ai";
import { CgMail, CgSmartphone } from "react-icons/cg";
import phoneFormatter from "@/utils/phoneFormatter";
import Image from "next/image";
import PlaceholderImage from "@/assets/user-image-with-black-background.png";
import Breadcrumb from "@/components/breadcrumb";
import BackButton from "@/components/backButton";

export const dynamic = "force-dynamic";

async function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = await getClient(slug);

  if (!client) return <ClientNotFount />;

  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Clientes"} description={"Informações de clientes"} />
      <Breadcrumb />
      <div className={"mainContent"}>
        <div className={styles.clientContainer}>
          <div className={styles.clientProfile}>
            <Image
              src={client.client_logo || PlaceholderImage}
              alt={"client-logo"}
              width={100}
              height={100}
              className={styles.clientLogo}
            />
            <div className={styles.clientName}>
              <h3>{client.client_name}</h3>
              <span>CNPJ: {client.client_cnpj}</span>
            </div>
          </div>
          <ul className={styles.clientInfos}>
            <ClientInfoItem
              Icon={<AiOutlinePhone className={styles.icons} />}
              label={"Telefone fixo"}
              value={client.client_landline || ""}
            />
            <ClientInfoItem
              Icon={<CgSmartphone className={styles.icons} />}
              label={"Celular"}
              value={phoneFormatter(client.client_phone) || ""}
            />
            <ClientInfoItem
              Icon={<CgMail className={styles.icons} />}
              label={"Email"}
              value={client.client_email || ""}
            />
          </ul>
          <div className={styles.button}>
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientNotFount() {
  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Clientes"} description={"Informações de clientes"} />
      <div className={"mainContent"}>
        <h4>Cliente não encontrado.</h4>
      </div>
    </div>
  );
}

export default ClientPage;
