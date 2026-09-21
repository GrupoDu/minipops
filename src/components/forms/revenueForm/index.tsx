"use client";

import useClient from "@/hooks/useClient";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Revenue } from "@/types/revenue.interface";
import InputText from "@/components/inputs/inputText";
import InputSelect from "@/components/inputs/inputSelect";
import styles from "./styles.module.scss";
import numberRgxFormatter from "@/utils/numberRgxFormatter";
import { BillingCreate } from "@/types/billing.interface";

type RevenueProps = {
  setRevenue: Dispatch<SetStateAction<Revenue>>;
  revenue: Revenue;
  handleCepChange: (cep: string) => Promise<void>;
};

const RevenueForm = ({
  setRevenue,
  revenue,
  handleCepChange,
}: RevenueProps) => {
  const { clients } = useClient();
  const customersList =
    clients?.map((client) => ({
      value: client.uuid,
      label: client.name,
    })) || [];

  const handleClientSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUuid = e.target.value;
    const selectedClient = clients?.find(
      (client) => client.uuid === selectedUuid,
    );

    setRevenue((prev) => ({
      ...prev,
      clientUuid: selectedUuid,
      phone: selectedClient?.phone || "",
      landline: selectedClient?.landline || "",
      cnpjCpf: selectedClient?.cnpjCpf || "",
      address: selectedClient?.address || "",
      email: selectedClient?.email || "",
    }));

    handleCepChange(selectedClient?.cep || "");
  };

  return (
    <div className={`${styles.revenueForm} multistepForm`}>
      <InputSelect
        label={"Cliente"}
        options={customersList}
        value={revenue.clientUuid}
        onChange={(e) => handleClientSelect(e)}
      />
      <InputText
        type={"text"}
        label={"Endereço"}
        required={true}
        value={revenue.address}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, address: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CNPJ/CPF"}
        placeholder={"00.000.000/0000-00 ou 000.000.000-00"}
        required={true}
        value={revenue.cnpjCpf}
        onChange={(e) =>
          setRevenue((prev) => ({
            ...prev,
            cnpjCpf: numberRgxFormatter(e.target.value),
          }))
        }
      />
      <InputText
        type={"text"}
        label={"Celular"}
        max={11}
        placeholder={"00000000000"}
        value={revenue.phone}
        onChange={(e) =>
          setRevenue((prev) => ({
            ...prev,
            phone: numberRgxFormatter(e.target.value),
          }))
        }
      />
      <InputText
        type={"text"}
        label={"Fixo"}
        max={10}
        placeholder={"0000000000"}
        value={revenue.landline}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, landline: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Email"}
        placeholder={"email@exemplo.com"}
        value={revenue.email}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, email: e.target.value }))
        }
      />
    </div>
  );
};

export default RevenueForm;
