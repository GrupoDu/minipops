"use client";

import styles from "./styles.module.scss";
import { Dispatch, SetStateAction } from "react";
import { DeliveryCreate } from "@/types/delivery.interface";
import InputText from "@/components/inputs/inputText";

type DeliveyProps = {
  setDelivery: Dispatch<SetStateAction<DeliveryCreate>>;
  delivery: DeliveryCreate;
};

const DeliveryForm = (props: DeliveyProps) => {
  const { setDelivery, delivery } = props;

  return (
    <div className={`multistepForm ${styles.deliveryForm}`}>
      <InputText
        type={"text"}
        label={"Obra"}
        value={delivery.building}
        onChange={(e) =>
          setDelivery((prev) => ({ ...prev, building: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Local de entrega"}
        value={delivery.delivery_address}
        onChange={(e) =>
          setDelivery((prev) => ({ ...prev, delivery_address: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CEP"}
        value={delivery.delivery_cep}
        onChange={(e) =>
          setDelivery((prev) => ({ ...prev, delivery_cep: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Número (local)"}
        value={delivery.address_number}
        onChange={(e) =>
          setDelivery((prev) => ({
            ...prev,
            address_number: e.target.value,
          }))
        }
      />
      <InputText
        type={"text"}
        label={"Celular"}
        value={delivery.contact_number}
        onChange={(e) =>
          setDelivery((prev) => ({
            ...prev,
            contact_number: e.target.value,
          }))
        }
      />
      <InputText
        type={"text"}
        label={"Referência"}
        value={delivery?.reference || ""}
        onChange={(e) =>
          setDelivery((prev) => ({ ...prev, reference: e.target.value }))
        }
      />
    </div>
  );
};

export default DeliveryForm;
