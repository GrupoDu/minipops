"use client";

import styles from "./styles.module.scss";
import InputText from "@/components/inputs/inputText";
import React, { useState } from "react";
import { ClientCreate } from "@/types/client.interface";
import DefaultButton from "@/components/defaultButton";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import numberRgxFormatter from "@/utils/numberRgxFormatter";
import { useLoading } from "@/hooks/useLoading";
import { AxiosError } from "axios";

const ClientForm = () => {
  const [client, setClient] = useState<ClientCreate>({
    client_name: "",
    client_cnpj: "",
    client_address: "",
    client_phone: "",
    client_email: "",
    client_landline: "",
    client_logo: "",
    client_city: "",
    client_cep: "",
    client_state: "",
    address_number: 0,
  });
  const { setIsLoading } = useLoading();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageSubmit = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const imageUploadResponse = await api.post("/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        skipToast: true,
      });
      return imageUploadResponse.data.data.imageUrl;
    } catch (err) {
      toast.warning(
        "A imagem não pôde ser enviada. O registro continuará sem logo.",
      );
      console.error((err as Error).message);
      return null;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const imageUrl = await handleImageSubmit();

    const finalClientData = {
      ...client,
      client_logo: imageUrl || client.client_logo,
      client_phone: numberRgxFormatter(client.client_phone),
    };

    try {
      await api.post("/clients", finalClientData);
      toast.success("Cliente registrado com sucesso");
      router.push("/clientes?page=1&per_page=7");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage = error.response?.data?.message || "";

      if (errorMessage.includes("Campos obrigatórios")) {
        return toast.error("Campos obrigatórios faltando.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepChange = async (cep: string) => {
    setClient((prev) => ({
      ...prev,
      client_cep: numberRgxFormatter(cep),
    }));

    if (cep.length < 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      const data = await response.json();

      setClient((prev) => ({
        ...prev,
        client_address: data.logradouro,
        client_city: data.bairro,
        client_state: data.uf,
      }));

      console.log(data);
    } catch (err) {
      toast.error("Não foi possível buscar o endereço.");
      console.error((err as Error).message);
    }
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
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
            label={"Razão Social"}
            placeholder={"Razão social do cliente"}
            required={true}
            value={client.client_name}
            onChange={(e) =>
              setClient((prev) => ({
                ...prev,
                client_name: e.target.value,
              }))
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
            max={10}
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
              setClient((prev) => ({
                ...prev,
                client_phone: e.target.value,
              }))
            }
          />
        </div>
        <InputText
          type={"text"}
          label={"Email"}
          placeholder={"email@email.com (opcional)"}
          value={client.client_email}
          onChange={(e) =>
            setClient((prev) => ({ ...prev, client_email: e.target.value }))
          }
        />
        <h4>Localização</h4>
        <div className={styles.gridInputs}>
          <InputText
            type={"text"}
            label={"CEP"}
            placeholder={"CEP"}
            required={true}
            value={client.client_cep}
            onChange={(e) => handleCepChange(e.target.value)}
          />
          <InputText
            type={"text"}
            label={"Cidade"}
            placeholder={"Cidade"}
            value={client.client_city}
            onChange={(e) =>
              setClient((prev) => ({ ...prev, client_city: e.target.value }))
            }
            required={true}
          />
          <InputText
            type={"text"}
            label={"Endereço"}
            placeholder={"Endereço"}
            value={client.client_address}
            onChange={(e) =>
              setClient((prev) => ({ ...prev, client_address: e.target.value }))
            }
            required={true}
          />
          <InputText
            type={"text"}
            label={"Número do endereção"}
            placeholder={"123"}
            value={client.address_number.toString()}
            onChange={(e) =>
              setClient((prev) => ({
                ...prev,
                address_number:
                  parseInt(numberRgxFormatter(e.target.value)) || 0,
              }))
            }
          />
        </div>

        <div className={styles.fileInputContainer}>
          <h4>Enviar logo do cliente</h4>
          <input
            type="file"
            accept={"image/*"}
            onChange={(e) => handleImagePick(e)}
          />
        </div>
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
