"use client";

import { Dispatch, SetStateAction } from "react";
import { BillingCreate } from "@/types/billing.interface";
import InputText from "@/components/inputs/inputText";
import { toast } from "react-toastify";

type BillingProps = {
  setBilling: Dispatch<SetStateAction<BillingCreate>>;
  billing: BillingCreate;
};

const BillingForm = (props: BillingProps) => {
  const { billing, setBilling } = props;

  const handleCEPSearch = async (cep: string) => {
    const formatedCep = cep.replace(/\D/g, "");

    setBilling((prev) => ({
      ...prev,
      billing_cep: formatedCep,
    }));

    if (formatedCep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data = await response.json();
      setBilling((prev) => ({
        ...prev,
        billing_address: data.logradouro,
      }));
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  return (
    <div className="multistepForm">
      <InputText
        type={"text"}
        label={"Nome"}
        required={true}
        value={billing.name || ""}
        onChange={(e) =>
          setBilling((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CEP"}
        required={true}
        max={8}
        placeholder={"00000000"}
        value={billing.billing_cep}
        onChange={(e) => handleCEPSearch(e.target.value)}
      />
      <InputText
        type={"text"}
        label={"Endereço"}
        required={true}
        value={billing.billing_address}
        onChange={(e) =>
          setBilling((prev) => ({ ...prev, billing_address: e.target.value }))
        }
      />
    </div>
  );
};

export default BillingForm;
