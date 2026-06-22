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
      router.push("/clientes");
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
