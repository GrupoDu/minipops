"use client";

import useCustomers from "@/hooks/useCustomers";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Revenue } from "@/types/revenue.interface";
import InputText from "@/components/inputs/inputText";
import InputSelect from "@/components/inputs/inputSelect";
import styles from "./styles.module.scss";
import numberRgxFormatter from "@/utils/numberRgxFormatter";

type RevenueProps = {
  setRevenue: Dispatch<SetStateAction<Revenue>>;
  revenue: Revenue;
};

const RevenueForm = (props: RevenueProps) => {
  const { setRevenue, revenue } = props;
  const { customers } = useCustomers();
  const customersList =
    customers?.map((customer) => ({
      value: customer.customerUuid,
      label: customer.companyName,
    })) || [];

  const handleClientSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUuid = e.target.value;
    const selectedClient = customers?.find(
      (customer) => customer.customerUuid === selectedUuid,
    );

    setRevenue((prev) => ({
      ...prev,
      customerUuid: selectedUuid,
      revenuePhone: selectedClient?.customerPhone || "",
      revenueLandline: selectedClient?.customerLandline || "",
      revenueCnpj: selectedClient?.customerCnpj || "",
      revenueAddress: selectedClient?.customerAddress || "",
      revenueEmail: selectedClient?.customerEmail || "",
    }));
  };

  return (
    <div className={`${styles.revenueForm} multistepForm`}>
      <InputSelect
        label={"Cliente"}
        options={customersList}
        value={revenue.customerUuid}
        onChange={(e) => handleClientSelect(e)}
      />
      <InputText
        type={"text"}
        label={"Endereço"}
        required={true}
        value={revenue.revenueAddress}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenueAddress: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CNPJ/CPF"}
        placeholder={"00.000.000/0000-00 ou 000.000.000-00"}
        required={true}
        value={revenue.revenueCnpj}
        onChange={(e) =>
          setRevenue((prev) => ({
            ...prev,
            revenueCnpj: numberRgxFormatter(e.target.value),
          }))
        }
      />
      <InputText
        type={"text"}
        label={"Celular"}
        max={11}
        placeholder={"00000000000"}
        value={revenue.revenuePhone}
        onChange={(e) =>
          setRevenue((prev) => ({
            ...prev,
            revenuePhone: numberRgxFormatter(e.target.value),
          }))
        }
      />
      <InputText
        type={"text"}
        label={"Fixo"}
        max={10}
        placeholder={"0000000000"}
        value={revenue.revenueLandline}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenueLandline: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Email"}
        placeholder={"email@exemplo.com"}
        value={revenue.revenueEmail}
        onChange={(e) =>
          setRevenue((prev) => ({ ...prev, revenueEmail: e.target.value }))
        }
      />
    </div>
  );
};

export default RevenueForm;
