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
          {supplier.supplierImage ? (
            <Image
              src={supplier.supplierImage}
              alt={"imagem-do-fornecedor"}
              className={styles.supplierLogo}
            />
          ) : (
            <CgProfile className={styles.supplierLogo} />
          )}
          <div className={styles.texts}>
            <h3>{supplier.companyName}</h3>
            <span>{supplier.supplierCnpj}</span>
            <div className={styles.segment}>
              <span>{supplier.supplierSegment}</span>
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
                <span>{supplier.supplierEmail}</span>
              </div>
            </div>
            <div className={styles.contact}>
              <CgSmartphone className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Celular</h5>
                <span>{supplier.supplierPhone}</span>
              </div>
            </div>
            <div className={styles.contact}>
              <TbDeviceLandlinePhone className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Fixo</h5>
                <span>{supplier.supplierLandline}</span>
              </div>
            </div>
          </section>
          <section>
            <h4>Endereço</h4>
            <div className={styles.address}>
              <BsPostcard className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>CEP</h5>
                <span>{cepFormatter(supplier.supplierCep)}</span>
              </div>
            </div>
            <div className={styles.address}>
              <CgPin className={styles.icon} />
              <div className={styles.textDescription}>
                <h5>Endereço</h5>
                <span>
                  {supplier.supplierAddress} - n°{supplier.addressNumber}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
