"use client";

import styles from "./styles.module.scss";
import InputText from "@/components/inputs/inputText";
import React, { useState } from "react";
import { CustomerCreate } from "@/types/customer.interface";
import DefaultButton from "@/components/defaultButton";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import numberRgxFormatter from "@/utils/numberRgxFormatter";
import { useLoading } from "@/hooks/useLoading";
import { AxiosError } from "axios";
import { cepFinder } from "@/utils/cepFinder";
import { hasContactInfo } from "@/utils/hasContactInfo";
import { WarningObs } from "@/components/WarningObs";

const ClientForm = () => {
  const [customer, setCustomer] = useState<CustomerCreate>({
    companyName: "",
    tradingName: "",
    customerCnpj: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
    customerLandline: "",
    customerLogo: "",
    customerCity: "",
    customerCep: "",
    customerState: "",
    addressNumber: "",
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
      ...customer,
      clientLogo: imageUrl || customer.customerLogo,
      clientPhone: numberRgxFormatter(customer.customerPhone || ""),
    };

    try {
      hasContactInfo(
        customer.customerEmail,
        customer.customerPhone,
        customer.customerLandline,
      );

      await api.post("/customer", finalClientData);
      toast.success("Cliente registrado com sucesso");
      router.push("/clientes?page=1&pageSize=7");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepChange = async (cep: string) => {
    setCustomer((prev) => ({
      ...prev,
      customerCep: numberRgxFormatter(cep),
    }));

    try {
      const addressInfo = await cepFinder(cep);

      setCustomer((prev) => ({
        ...prev,
        customerAddress: addressInfo.logradouro,
        customerCity: addressInfo.bairro,
        customerState: addressInfo.uf,
      }));
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
      <div>
        <WarningObs
          warning={"Pelo menos um contato deve ser informado"}
          style={{ margin: ".6rem" }}
        />
      </div>
      <div className={styles.inputs}>
        <div className={styles.gridInputs}>
          <InputText
            type={"text"}
            label={"Razão Social"}
            placeholder={"Razão Social"}
            required={true}
            value={customer.companyName}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"CNPJ"}
            placeholder={"CNPJ"}
            required={true}
            value={customer.customerCnpj}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev, customerCnpj: e.target.value }))
            }
          />
          <InputText
            type={"text"}
            label={"Nome Fantasia"}
            placeholder={"Nome Fantasia"}
            required={true}
            value={customer.tradingName}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev, tradingName: e.target.value }))
            }
          />
          <InputText
            type={"text"}
            label={"Celular"}
            placeholder={"Telefone celular (opcional)"}
            max={11}
            value={customer.customerPhone || ""}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev,
                customerPhone: e.target.value,
              }))
            }
          />
        </div>
        <InputText
          type={"text"}
          label={"Fixo"}
          placeholder={"Telefone fixo (opcional)"}
          max={10}
          value={String(customer.customerLandline)}
          onChange={(e) =>
            setCustomer((prev) => ({
              ...prev,
              customerLandline: e.target.value,
            }))
          }
        />
        <InputText
          type={"email"}
          label={"Email"}
          placeholder={"email@exemplo.com (opcional)"}
          value={customer.customerEmail || ""}
          onChange={(e) =>
            setCustomer((prev) => ({ ...prev, customerEmail: e.target.value }))
          }
        />
        <h4>Localização</h4>
        <div className={styles.gridInputs}>
          <InputText
            type={"text"}
            label={"CEP"}
            placeholder={"CEP"}
            required={true}
            value={customer.customerCep}
            onChange={(e) => handleCepChange(e.target.value)}
          />
          <InputText
            type={"text"}
            label={"Cidade"}
            placeholder={"Cidade"}
            value={customer.customerCity}
            onChange={(e) =>
              setCustomer((prev) => ({ ...prev, customerCity: e.target.value }))
            }
            required={true}
          />
          <InputText
            type={"text"}
            label={"Endereço"}
            placeholder={"Endereço"}
            value={customer.customerAddress}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev,
                customerAddress: e.target.value,
              }))
            }
            required={true}
          />
          <InputText
            type={"text"}
            label={"Número do endereço"}
            placeholder={"1233"}
            max={4}
            value={customer.addressNumber.toString()}
            onChange={(e) =>
              setCustomer((prev) => ({
                ...prev,
                addressNumber: numberRgxFormatter(e.target.value) || "",
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
