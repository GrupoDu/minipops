"use client";

import styles from "./styles.module.scss";
import { TbCancel } from "react-icons/tb";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { BiCheck } from "react-icons/bi";
import BackButton from "@/components/backButton";
import { Modal } from "@/components/modal";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_PARAMS } from "@/constants/defaultParams.constant";
import { useLoading } from "@/hooks/useLoading";

export const StatusButtons = ({
  slug,
  show,
}: {
  slug: string;
  show: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const { setIsLoading } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  const changeStatus = async () => {
    setIsLoading(true);

    enum acceptableStatus {
      DONE = "Concluído",
      CANCELED = "Cancelado",
    }

    const isValidStatus = Object.values(acceptableStatus).includes(
      status as acceptableStatus,
    );

    if (!isValidStatus) {
      toast.error("Status inválido.");
      return;
    }

    try {
      const response = await api.put(`/orders/${slug}`, {
        order_status: status,
      });

      const data = await response.data;

      toast.success(data.message);
      router.push(`${pathname}?${DEFAULT_PARAMS}`);
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        type={"warning"}
        showModal={showModal}
        setShowModal={setShowModal}
        onClickConfirm={() => changeStatus()}
      />
      <div className={styles.statusBtnsContainer}>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        <div
          className={styles.statusBtns}
          style={{ display: show ? "flex" : "none" }}
        >
          <button
            type={"button"}
            className={styles.doneButton}
            onClick={() => {
              setStatus("Concluído");
              setShowModal(true);
            }}
          >
            <span>Marcar como Finalizado</span>
            <BiCheck />
          </button>
          <button
            type={"button"}
            onClick={() => {
              setStatus("Cancelado");
              setShowModal(true);
            }}
            className={styles.cancelButton}
          >
            <span>Marcar como Cancelado</span>
            <TbCancel />
          </button>
        </div>
      </div>
    </>
  );
};
