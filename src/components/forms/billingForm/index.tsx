"use client";

import { Dispatch, SetStateAction } from "react";
import { BillingCreate } from "@/types/billing.interface";
import InputText from "@/components/inputs/inputText";
import { toast } from "react-toastify";
import { cepFinder } from "@/utils/cepFinder";

type BillingProps = {
  setBilling: Dispatch<SetStateAction<BillingCreate>>;
  billing: BillingCreate;
};

const BillingForm = (props: BillingProps) => {
  const { billing, setBilling } = props;

  const handleCepChange = async (cep: string) => {
    const formatedCep = cep.replace(/\D/g, "");

    setBilling((prev) => ({
      ...prev,
      billingCep: formatedCep,
    }));

    try {
      const addressInfo = await cepFinder(cep);

      setBilling((prev) => ({
        ...prev,
        billingAddress: addressInfo.logradouro,
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
        value={billing.billingCep}
        onChange={(e) => handleCepChange(e.target.value)}
      />
      <InputText
        type={"text"}
        label={"Endereço"}
        required={true}
        value={billing.billingAddress}
        onChange={(e) =>
          setBilling((prev) => ({ ...prev, billingAddress: e.target.value }))
        }
      />
    </div>
  );
};

export default BillingForm;
