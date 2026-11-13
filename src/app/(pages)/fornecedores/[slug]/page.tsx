"use client";

import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import Breadcrumb from "@/components/breadcrumb";
import { CgPin, CgProfile, CgSmartphone } from "react-icons/cg";
import BackButton from "@/components/backButton";
import { SupplierModal } from "@/components/supplierModal";
import UseFetch from "@/hooks/useFetch";
import { Supplier } from "@/types/suppliers.interface";
import { useParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";
import { useEffect } from "react";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { BsPostcard } from "react-icons/bs";
import cepFormatter from "@/utils/cepFormatter";
import { useModal } from "@/hooks/useModal";
import DefaultButton from "@/components/defaultButton";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { cnpjFormatter } from "@/utils/cnpjFormatter";

function SupplierInfoPage() {
  const { slug: supplierUuid } = useParams<{ slug: string }>();
  const { setShowModal } = useModal();

  return (
    <>
      <SupplierModal slug={supplierUuid} />
      <div className={"pageContainer"}>
        <PageHeader
          title={"Fornecedor"}
          description={"Informações do fornecedor"}
        />
        <Breadcrumb />
        <div className="mainContent">
          <div className={styles.actionButtons}>
            <div className={styles.backButton}>
              <BackButton />
            </div>
            <DefaultButton
              type={"button"}
              className={styles.deleteButton}
              onClick={() => setShowModal(true)}
              style={{
                borderRadius: "borders.$big-radius",
              }}
            >
              <BiTrash className={styles.buttonIcon} />
              <span>
                <strong>Remover</strong>
              </span>
            </DefaultButton>
            <DefaultButton
              type={"button"}
              isLink={true}
              className={styles.editButton}
              href={`${supplierUuid}/editar`}
            >
              <FaEdit className={styles.buttonIcon} />
              <span>
                <strong>Editar</strong>
              </span>
            </DefaultButton>
          </div>
          <SupplierInfos supplierUuid={supplierUuid} />
        </div>
      </div>
    </>
  );
}

function SupplierInfos({ supplierUuid }: { supplierUuid: string }) {
  const { data: supplier } = UseFetch<Supplier>(`/supplier/${supplierUuid}`);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (!supplier) {
    return <SupplierNotFound />;
  }

  return (
    <>
      <div className={styles.supplierInfoContainer}>
        <div className={styles.topInformation}>
          {supplier.image ? (
            <Image
              src={supplier.image}
              alt={"imagem-do-fornecedor"}
              className={styles.supplierLogo}
            />
          ) : (
            <CgProfile className={styles.supplierLogo} />
          )}
          <div className={styles.texts}>
            <h3>{supplier.name}</h3>
            <span>{cnpjFormatter(supplier.cnpjCpf)}</span>
            <div className={styles.segment}>
              <span>{supplier.segment}</span>
            </div>
          </div>
        </div>
        <div className={styles.middleInformation}>
          <section>
            <h4>Contatos</h4>
            <div className={styles.contact}>
              <MdOutlineEmail className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Email</h5>
                <span>{supplier.email || "Email não informado"}</span>
              </div>
            </div>
            <div className={styles.contact}>
              <CgSmartphone className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Celular</h5>
                <span>{supplier.phone || "Celular não informado"}</span>
              </div>
            </div>
            <div className={styles.contact}>
              <TbDeviceLandlinePhone className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Fixo</h5>
                <span>{supplier.landline || "Fixo não informado"}</span>
              </div>
            </div>
          </section>
          <section>
            <h4>Endereço</h4>
            <div className={styles.address}>
              <BsPostcard className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>CEP</h5>
                <span>{cepFormatter(supplier.cep)}</span>
              </div>
            </div>
            <div className={styles.address}>
              <CgPin className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Endereço</h5>
                <span>{formatAddress(supplier)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function SupplierNotFound() {
  return (
    <div className={styles.notFound}>
      <CgProfile className={styles.supplierLogo} />
      <div className={styles.text}>
        <h3>Fornecedor não encontrado</h3>
        <BackButton />
      </div>
    </div>
  );
}

function formatAddress(supplier: Supplier) {
  return `${supplier.address} - n°${supplier.addressNumber}`;
}

export default SupplierInfoPage;
