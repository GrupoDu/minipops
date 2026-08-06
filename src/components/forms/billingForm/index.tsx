"use client";

import { Dispatch, SetStateAction } from "react";
import { BillingCreate } from "@/types/billing.interface";
import InputText from "@/components/inputs/inputText";
import { toast } from "react-toastify";
import { cepFinder } from "@/utils/cepFinder";

type BillingProps = {
  setBilling: Dispatch<SetStateAction<BillingCreate>>;
  billing: BillingCreate;
  handleCepChange: (cep: string) => Promise<void>;
};

const BillingForm = ({
  billing,
  setBilling,
  handleCepChange,
}: BillingProps) => {
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
