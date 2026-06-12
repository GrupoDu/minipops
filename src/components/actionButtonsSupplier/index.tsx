"use client";

import styles from "./style.module.scss";
import { FaEdit } from "react-icons/fa";
import DefaultButton from "@/components/defaultButton";
import { BiTrash } from "react-icons/bi";
import { useModal } from "@/hooks/useModal";

export const ActionButtonsSupplier = ({ slug }: { slug: string }) => {
  const { setShowModal } = useModal();

  return (
    <div className={styles.actionButtons}>
      <DefaultButton
        type={"button"}
        className={styles.deleteButton}
        onClick={() => setShowModal(true)}
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
        href={`${slug}/editar`}
      >
        <FaEdit className={styles.buttonIcon} />
        <span>
          <strong>Editar</strong>
        </span>
      </DefaultButton>
    </div>
  );
};
