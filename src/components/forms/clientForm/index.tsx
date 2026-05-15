"use client";

import styles from "./styles.module.scss";
import InputText from "@/components/inputs/inputText";
import { useState } from "react";
import { ClientCreate } from "@/types/client.interface";
import DefaultButton from "@/components/defaultButton";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";

const ClientForm = () => {
  const [client, setClient] = useState<ClientCreate>({
    client_name: "",
    client_cnpj: "",
    client_address: "",
    client_phone: "",
    client_email: "",
    client_landline: "",
  });
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await api.post("/clients", client);
      toast.success("Cliente registrado com sucesso");
      router.push("/clientes");
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    }
  };

  return (
    <form className={"formContainer"}>
      <div className={styles.formHeader}>
        <h5>Adicionar novo cliente</h5>
      </div>
      <div className={styles.inputs}>
        <div className={styles.gridInputs}>
          <InputText
            type={"text"}
            label={"Nome"}
            placeholder={"Nome do cliente"}
            required={true}
            value={client.client_name}
            onChange={(e) =>
              setClient((prev) => ({ ...prev, client_name: e.target.value }))
            }
          />
          <InputText
            type={"text"}
            label={"CNPJ"}
            placeholder={"CNPJ"}
            required={true}
            value={client.client_cnpj}
            onChange={(e) =>
              setClient((prev) => ({ ...prev, client_cnpj: e.target.value }))
            }
          />
          <InputText
            type={"text"}
            label={"Fixo"}
            placeholder={"Telefone fixo (opcional)"}
            value={String(client.client_landline)}
            onChange={(e) =>
              setClient((prev) => ({
                ...prev,
                client_landline: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"Celular"}
            required={true}
            placeholder={"Telefone celular"}
            value={client.client_phone}
            onChange={(e) =>
              setClient((prev) => ({ ...prev, client_phone: e.target.value }))
            }
          />
        </div>
        <InputText
          type={"text"}
          label={"Endereço"}
          placeholder={"Endereço"}
          required={true}
          value={client.client_address}
          onChange={(e) =>
            setClient((prev) => ({ ...prev, client_address: e.target.value }))
          }
        />
        <InputText
          type={"text"}
          label={"Email"}
          placeholder={"email@email.com (opcional)"}
          value={client.client_email}
          onChange={(e) =>
            setClient((prev) => ({ ...prev, client_email: e.target.value }))
          }
        />
        <div className={styles.buttons}>
          <DefaultButton onClick={() => router.back()} type={"button"}>
            Cancelar
          </DefaultButton>
          <DefaultButton onClick={handleSubmit} type={"button"}>
            Registrar
          </DefaultButton>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;
