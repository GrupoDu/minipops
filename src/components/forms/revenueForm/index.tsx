"use client";

import useClients from "@/hooks/useClients";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { Revenue } from "@/types/revenue.interface";
import InputText from "@/components/inputs/inputText";
import InputSelect from "@/components/inputs/inputSelect";
import styles from "./styles.module.scss";

type RevenueProps = {
  setRevenue: Dispatch<SetStateAction<Revenue>>;
  revenue: Revenue;
};

const RevenueForm = (props: RevenueProps) => {
  const { setRevenue, revenue } = props;
  const { error, status, clients } = useClients();
  const clientsList =
    clients?.map((client) => ({
      value: client.client_uuid,
      label: client.client_name,
    })) || [];

  const handleClientSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUuid = e.target.value;
    const selectedClient = clients?.find(
      (client) => client.client_uuid === selectedUuid,
    );

    setRevenue((prev) => ({
      ...prev,
      client_uuid: selectedUuid,
      revenue_phone: selectedClient?.client_phone || "",
      revenue_landline: selectedClient?.client_landline || "",
      revenue_cnpj: selectedClient?.client_cnpj || "",
      revenue_address: selectedClient?.client_address || "",
    }));
  };

  return (
    <div className={`${styles.revenueForm} multistepForm`}>
      <InputSelect
        label={"Cliente"}
        options={clientsList}
        value={revenue.client_uuid}
        onChange={(e) => handleClientSelect(e)}
      />
      <InputText
        type={"text"}
        label={"Endereço"}
        required={true}
        value={revenue.revenue_address}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenue_address: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CNPJ"}
        required={true}
        value={revenue.revenue_cnpj}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenue_cnpj: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Telefone"}
        required={true}
        value={revenue.revenue_phone}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenue_phone: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Fixo"}
        value={revenue.revenue_landline}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenue_landline: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Email"}
        value={revenue.revenue_email}
        required={true}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenue_email: e.target.value }))
        }
      />
    </div>
  );
};

export default RevenueForm;
