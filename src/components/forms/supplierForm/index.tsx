"use client";

import styles from "./styles.module.scss";
import InputText from "@/components/inputs/inputText";
import React, { useState } from "react";
import { SupplierCreate } from "@/types/suppliers.interface";
import DefaultButton from "@/components/defaultButton";
import BackButton from "@/components/backButton";
import { api } from "@/services/api";
import numberRgxFormatter from "@/utils/numberRgxFormatter";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { cepFinder } from "@/utils/cepFinder";

export const SupplierForm = () => {
  const [supplier, setSupplier] = useState<SupplierCreate>({
    name: "",
    tradingName: "",
    landline: "",
    phone: "",
    email: "",
    cnpjCpf: "",
    segment: "",
    image: "",
    address: "",
    cep: "",
    addressNumber: "",
  });
  const router = useRouter();

  const handleCepChange = async (cep: string) => {
    setSupplier((prev) => ({
      ...prev,
      cep,
    }));

    try {
      const addressInfos = await cepFinder(cep);

      setSupplier((prev) => ({
        ...prev,
        address: addressInfos.logradouro,
      }));
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  const hasContactInfo = () => {
    const hasEmail = !!supplier.email && supplier.email.length > 0;
    const hasLandline = !!supplier.landline && supplier.landline.length > 0;
    const hasPhone = !!supplier.phone && supplier.phone.length > 0;

    if (hasEmail || hasLandline || hasPhone) return;

    throw new Error("Fornecedor deve ter pelo menos um contato");
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supplierData = {
      ...supplier,
      supplierCep: numberRgxFormatter(supplier.cep),
      addressNumber: numberRgxFormatter(supplier.addressNumber),
    };

    try {
      hasContactInfo();

      await api.post("/supplier", supplierData);

      toast.success("Fornecedor adicionado com sucesso");
      router.push("/fornecedores");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  return (
    <form className={"formContainer"} onSubmit={(e) => handleSubmit(e)}>
      <h5 className={styles.formTitle}>Adicionar novo fornecedor</h5>
      <div className={styles.inputsContainer}>
        <InputText
          type={"text"}
          label={"Razão Social"}
          value={supplier.name}
          onChange={(e) =>
            setSupplier((prev) => ({ ...prev, name: e.target.value }))
          }
          required={true}
          placeholder={"Razão Social"}
          style={{ padding: ".6rem .8rem" }}
        />
        <InputText
          type={"text"}
          label={"Nome Fantasia"}
          value={supplier.tradingName}
          onChange={(e) =>
            setSupplier((prev) => ({ ...prev, tradingName: e.target.value }))
          }
          required={true}
          placeholder={"Nome Fantasia"}
          style={{ padding: ".6rem .8rem" }}
        />
        <InputText
          type={"text"}
          label={"CNPJ"}
          required={true}
          placeholder={"CNPJ"}
          value={supplier.cnpjCpf}
          onChange={(e) =>
            setSupplier((prev) => ({ ...prev, cnpjCpf: e.target.value }))
          }
          style={{ padding: ".6rem .8rem" }}
        />
        <div className={styles.gridInputs}>
          <InputText
            type={"text"}
            label={"CEP"}
            placeholder={"CEP do fornecedor"}
            value={supplier.cep}
            onChange={(e) => handleCepChange(e.target.value)}
          />
          <InputText
            type={"text"}
            label={"Celular"}
            placeholder={"000000000"}
            max={11}
            value={supplier.phone}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"Fixo"}
            max={10}
            placeholder={"Telefone fixo"}
            value={supplier.landline}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                landline: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"Email"}
            placeholder={"Email"}
            value={supplier.email}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <InputText
          type={"text"}
          label={"Endereço"}
          required={true}
          placeholder={"Endereço do fornecedor"}
          value={supplier.address}
          onChange={(e) =>
            setSupplier((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          style={{ padding: ".6rem .8rem" }}
        />
        <InputText
          type={"text"}
          label={"Número (local)"}
          placeholder={"3499"}
          max={4}
          value={supplier.addressNumber}
          onChange={(e) =>
            setSupplier((prev) => ({
              ...prev,
              addressNumber: e.target.value,
            }))
          }
          style={{ padding: ".6rem .8rem" }}
        />
        <InputText
          type={"text"}
          label={"Segmento"}
          required={true}
          placeholder={"Segmento do fornecedor"}
          style={{ padding: ".6rem .8rem" }}
          value={supplier.segment}
          onChange={(e) =>
            setSupplier((prev) => ({
              ...prev,
              segment: e.target.value,
            }))
          }
        />
      </div>
      <div className={styles.buttonContainer}>
        <BackButton />
        <DefaultButton type={"submit"}>Registrar</DefaultButton>
      </div>
    </form>
  );
};
