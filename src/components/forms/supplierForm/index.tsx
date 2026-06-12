"use client";

import styles from "./styles.module.scss";
import InputText from "@/components/inputs/inputText";
import React, { useState } from "react";
import { SupplierCreate } from "@/types/suppliers.type";
import DefaultButton from "@/components/defaultButton";
import BackButton from "@/components/backButton";
import { api } from "@/services/api";
import numberRgxFormatter from "@/utils/numberRgxFormatter";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const SupplierForm = () => {
  const [supplier, setSupplier] = useState<SupplierCreate>({
    supplier_name: "",
    supplier_landline: "",
    supplier_phone: "",
    supplier_email: "",
    supplier_cnpj: "",
    supplier_segment: "",
    supplier_image: "",
    supplier_address: "",
    supplier_cep: "",
    address_number: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supplierData = {
      ...supplier,
      supplier_cep: Number(numberRgxFormatter(supplier.supplier_cep)),
      address_number: Number(numberRgxFormatter(supplier.address_number)),
    };

    try {
      await api.post("/suppliers", supplierData);

      toast.success("Fornecedor adicionado com sucesso");
      router.push("/fornecedores");
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    }
  };

  return (
    <form className={"formContainer"} onSubmit={(e) => handleSubmit(e)}>
      <h5 className={styles.formTitle}>Adicionar novo fornecedor</h5>
      <div className={styles.inputsContainer}>
        <InputText
          type={"text"}
          label={"Razão Social"}
          value={supplier.supplier_name}
          onChange={(e) =>
            setSupplier((prev) => ({ ...prev, supplier_name: e.target.value }))
          }
          required={true}
          placeholder={"Razão Social"}
          style={{ padding: ".6rem .8rem" }}
        />
        <InputText
          type={"text"}
          label={"CNPJ"}
          required={true}
          placeholder={"CNPJ"}
          value={supplier.supplier_cnpj}
          onChange={(e) =>
            setSupplier((prev) => ({ ...prev, supplier_cnpj: e.target.value }))
          }
          style={{ padding: ".6rem .8rem" }}
        />
        <div className={styles.gridInputs}>
          <InputText
            type={"text"}
            label={"CEP"}
            required={true}
            placeholder={"CEP do fornecedor"}
            value={supplier.supplier_cep}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                supplier_cep: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"Celular"}
            required={true}
            placeholder={"Endereço do fornecedor"}
            value={supplier.supplier_phone}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                supplier_phone: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"Fixo"}
            required={true}
            placeholder={"Telefone fixo"}
            value={supplier.supplier_landline}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                supplier_landline: e.target.value,
              }))
            }
          />
          <InputText
            type={"text"}
            label={"Email"}
            required={true}
            placeholder={"Email"}
            value={supplier.supplier_email}
            onChange={(e) =>
              setSupplier((prev) => ({
                ...prev,
                supplier_email: e.target.value,
              }))
            }
          />
        </div>
        <InputText
          type={"text"}
          label={"Endereço"}
          required={true}
          placeholder={"Endereço do fornecedor"}
          value={supplier.supplier_address}
          onChange={(e) =>
            setSupplier((prev) => ({
              ...prev,
              supplier_address: e.target.value,
            }))
          }
          style={{ padding: ".6rem .8rem" }}
        />
        <InputText
          type={"text"}
          label={"Número (local)"}
          required={true}
          placeholder={"349"}
          value={supplier.address_number}
          onChange={(e) =>
            setSupplier((prev) => ({
              ...prev,
              address_number: e.target.value,
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
          value={supplier.supplier_segment}
          onChange={(e) =>
            setSupplier((prev) => ({
              ...prev,
              supplier_segment: e.target.value,
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
