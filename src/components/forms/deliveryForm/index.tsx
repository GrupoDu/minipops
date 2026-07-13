"use client";

import styles from "./styles.module.scss";
import { Dispatch, SetStateAction } from "react";
import { DeliveryCreate } from "@/types/delivery.interface";
import InputText from "@/components/inputs/inputText";
import CepFormatter from "@/utils/cepFormatter";
import numberRgxFormatter from "@/utils/numberRgxFormatter";

type DeliveyProps = {
  setDelivery: Dispatch<SetStateAction<DeliveryCreate>>;
  delivery: DeliveryCreate;
};

const DeliveryForm = (props: DeliveyProps) => {
  const { setDelivery, delivery } = props;

  const findCep = async (cep: string) => {
    setDelivery((prev) => ({ ...prev, delivery_cep: cep }));

    if (cep.length < 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data = await response.json();

      setDelivery((prev) => ({ ...prev, delivery_address: data.logradouro }));
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <div className={`multistepForm ${styles.deliveryForm}`}>
      <InputText
        type={"text"}
        label={"Obra"}
        required={true}
        value={delivery.building}
        onChange={(e) =>
          setDelivery((prev) => ({ ...prev, building: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"CEP"}
        max={8}
        placeholder={"00000000"}
        required={true}
        value={delivery.delivery_cep}
        onChange={(e) => findCep(numberRgxFormatter(e.target.value))}
      />
      <InputText
        type={"text"}
        label={"Local de entrega"}
        required={true}
        value={delivery.delivery_address}
        onChange={(e) =>
          setDelivery((prev) => ({ ...prev, delivery_address: e.target.value }))
        }
      />
      <InputText
        type={"text"}
        label={"Número"}
        placeholder={"000"}
        max={4}
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
        max={11}
        placeholder={"00000000000"}
        required={true}
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
