"use client";

import { CgMail, CgSmartphone } from "react-icons/cg";
import BackButton from "../backButton";
import ClientInfoItem from "../clientInfoItem";
import styles from "./styles.module.scss";
import { AiOutlinePhone } from "react-icons/ai";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import PlaceholderImage from "@/assets/user-image-with-black-background.png";
import { Customer } from "@/types/customer.interface";
import PageHeader from "@/components/pageHeader";
import phoneFormatter from "@/utils/phoneFormatter";
import { MdLocationOn } from "react-icons/md";
import cepFormatter from "@/utils/cepFormatter";
import { cnpjFormatter } from "@/utils/cnpjFormatter";

export const ClientContainer = ({ customerUuid }: { customerUuid: string }) => {
  const { data: customer } = useFetch<Customer>(`/customer/${customerUuid}`);

  if (!customer) return <CustomerNotFound />;

  const hasAddressNumber =
    customer.addressNumber !== "" &&
    customer.addressNumber !== null &&
    customer.addressNumber !== undefined;

  const addressNumber = hasAddressNumber ? `Nº ${customer.addressNumber}` : "";

  const fullLocation = `${customer.customerAddress} ${addressNumber}, ${customer.customerCity} - ${cepFormatter(customer.customerCep)} ${customer.customerState}`;

  return (
    <div className={styles.customerContainer}>
      <div className={styles.customerProfile}>
        <Image
          src={customer.customerLogo || PlaceholderImage}
          alt={"customer-logo"}
          width={100}
          height={100}
          className={styles.clientLogo}
        />
        <div className={styles.clientName}>
          <h3>{customer.companyName}</h3>
          <span>CNPJ: {cnpjFormatter(customer.customerCnpj)}</span>
        </div>
      </div>
      <ul className={styles.clientInfos}>
        <ClientInfoItem
          Icon={<AiOutlinePhone className={styles.icons} />}
          label={"Telefone fixo"}
          value={customer.customerLandline || ""}
        />
        <ClientInfoItem
          Icon={<CgSmartphone className={styles.icons} />}
          label={"Celular"}
          value={phoneFormatter(customer.customerPhone || "")}
        />
        <ClientInfoItem
          Icon={<CgMail className={styles.icons} />}
          label={"Email"}
          value={customer.customerEmail || ""}
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

function CustomerNotFound() {
  return (
    <div className={"pageContainer"}>
      <PageHeader title={"Clientes"} description={"Informações de clientes"} />
      <div className={"mainContent"}>
        <h4>Cliente não encontrado.</h4>
      </div>
    </div>
  );
}
