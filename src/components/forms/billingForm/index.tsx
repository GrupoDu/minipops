"use client";

import { Dispatch, SetStateAction } from "react";
import { BillingCreate } from "@/types/billing.interface";
import InputText from "@/components/inputs/inputText";
import styles from "./styles.module.scss";

type BillingProps = {
  setBilling: Dispatch<SetStateAction<BillingCreate>>;
  billing: BillingCreate;
};

const BillingForm = (props: BillingProps) => {
  const { billing, setBilling } = props;

  return (
    <div className="multistepForm">
      <InputText
        type={"text"}
        label={"Nome"}
        value={billing.name || ""}
        onChange={(e) =>
          setBilling((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Endereço"}
        value={billing.billing_address}
        onChange={(e) =>
          setBilling((prev) => ({ ...prev, billing_address: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CEP"}
        value={billing.billing_cep}
        onChange={(e) =>
          setBilling((prev) => ({ ...prev, billing_cep: e.target.value }))
        }
      />
    </div>
  );
};

export default BillingForm;
