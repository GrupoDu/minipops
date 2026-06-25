"use client";

import { CgMail, CgSmartphone } from "react-icons/cg";
import BackButton from "../backButton";
import ClientInfoItem from "../clientInfoItem";
import styles from "./styles.module.scss";
import { AiOutlinePhone } from "react-icons/ai";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import PlaceholderImage from "@/assets/user-image-with-black-background.png";
import { Client } from "@/types/client.interface";
import PageHeader from "@/components/pageHeader";
import phoneFormatter from "@/utils/phoneFormatter";

export const ClientContainer = ({ client_uuid }: { client_uuid: string }) => {
  const { data: client } = useFetch<Client>(`/clients/${client_uuid}`);

  if (!client) return <ClientNotFount />;

  return (
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
  );
};

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
