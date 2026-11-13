"use client";

import PageHeader from "@/components/pageHeader";
import Breadcrumb from "@/components/breadcrumb";
import styles from "./page.module.scss";
import PlaceholderImage from "@/assets/user-image-with-black-background.png";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Client } from "@/types/client.interface";
import stringIsNullOrEmpty from "@/utils/stringIsNullOrEmpty";
import Image from "next/image";
import ClientInfoItem from "@/components/clientInfoItem";
import { MdLocationOn } from "react-icons/md";
import { CgMail, CgSmartphone } from "react-icons/cg";
import { AiOutlinePhone } from "react-icons/ai";
import phoneFormatter from "@/utils/phoneFormatter";
import { displayCnpjCpf } from "@/utils/cnpjCpfFormatter";
import BackButton from "@/components/backButton";
import cepFormatter from "@/utils/cepFormatter";

export const dynamic = "force-dynamic";

function formatFullLocation(client: Client, addressNumber: string) {
  return `${client.address} ${addressNumber}, ${client.city} - ${cepFormatter(client.cep)} ${client.state}`;
}

function ClientPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Clientes"} description={"Informações de clientes"} />
      <Breadcrumb />
      <div className={"mainContent"}>
        <DisplayClientInfos />
      </div>
    </div>
  );
}

function DisplayClientInfos() {
  const { slug: customerUuid } = useParams<{ slug: string }>();
  const { data: client } = useFetch<Client>(`/client/${customerUuid}`);
  const addressNumber = !stringIsNullOrEmpty(client?.addressNumber)
    ? `Nº ${client?.addressNumber}`
    : "";

  if (!client) {
    return <ClientNotFound />;
  }

  return (
    <div className={styles.customerContainer}>
      <div className={styles.customerProfile}>
        <Image
          src={client.logo || PlaceholderImage}
          alt={"customer-logo"}
          width={100}
          height={100}
          className={styles.clientLogo}
        />
        <div className={styles.clientName}>
          <h3>{client.name}</h3>
          <span>CNPJ: {displayCnpjCpf(client.cnpjCpf)}</span>
        </div>
      </div>
      <ul className={styles.customerInfos}>
        <ClientInfoItem
          Icon={<AiOutlinePhone className={styles.icons} />}
          label={"Telefone fixo"}
          value={client.landline || ""}
        />
        <ClientInfoItem
          Icon={<CgSmartphone className={styles.icons} />}
          label={"Celular"}
          value={phoneFormatter(client.phone || "")}
        />
        <ClientInfoItem
          Icon={<CgMail className={styles.icons} />}
          label={"Email"}
          value={client.email || ""}
        />
        <ClientInfoItem
          Icon={<MdLocationOn className={styles.icons} />}
          label={"Localização"}
          value={formatFullLocation(client, addressNumber)}
        />
      </ul>
      <div className={styles.button}>
        <BackButton />
      </div>
    </div>
  );
}

function ClientNotFound() {
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
