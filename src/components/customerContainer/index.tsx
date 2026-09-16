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
import { MdLocationOn } from "react-icons/md";
import cepFormatter from "@/utils/cepFormatter";
import { cnpjFormatter } from "@/utils/cnpjFormatter";

export const CustomerContainer = ({
  customerUuid,
}: {
  customerUuid: string;
}) => {
  const { data: client } = useFetch<Client>(`/client/${customerUuid}`);

  if (!client) return <ClientNotFound />;

  const hasAddressNumber =
    client.addressNumber !== "" &&
    client.addressNumber !== null &&
    client.addressNumber !== undefined;

  const addressNumber = hasAddressNumber ? `Nº ${client.addressNumber}` : "";

  const fullLocation = `${client.address} ${addressNumber}, ${client.city} - ${cepFormatter(client.cep)} ${client.state}`;

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
          <span>CNPJ: {cnpjFormatter(client.cnpj)}</span>
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
          value={fullLocation}
        />
      </ul>
      <div className={styles.button}>
        <BackButton />
      </div>
    </div>
  );
};

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
