"use client";

import { Supplier } from "@/types/suppliers.interface";
import styles from "./styles.module.scss";
import { CgPin, CgProfile, CgSmartphone } from "react-icons/cg";
import cepFormatter from "@/utils/cepFormatter";
import { BsPostcard } from "react-icons/bs";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import Image from "next/image";
import { useLoading } from "@/hooks/useLoading";
import { useEffect } from "react";

export const SupplierInfos = ({ supplier }: { supplier: Supplier }) => {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

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
            <span>{supplier.cnpjCpf}</span>
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
                <span>
                  {supplier.address} - n°{supplier.addressNumber}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
