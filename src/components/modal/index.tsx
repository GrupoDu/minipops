import styles from "./styles.module.scss";
import { CSSProperties } from "react";
import { ImWarning } from "react-icons/im";
import DefaultButton from "@/components/defaultButton";

type ModalProps = {
  type: "warning" | "confirm";
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onClickConfirm: () => void;
};

export const Modal = (props: ModalProps) => {
  const { type, onClickConfirm, showModal, setShowModal } = props;

  const warningText = "Essa ação não poderá ser recuperada.";
  const confirmText = "Deseja confirmar a ação?";
  const title = type === "warning" ? "Aviso!" : "Confirmar";
  const text = type === "warning" ? warningText : confirmText;

  const warningStyle: CSSProperties = {
    background: "var(--warning-gradient)",
  };
  const confirmStyle: CSSProperties = {
    background: "var(--confirm-gradient)",
  };

  const titleStyle = type === "warning" ? warningStyle : confirmStyle;

  return (
    <div className={`${styles.modalContainer} ${showModal && styles.show}`}>
      <header style={titleStyle}>
        <ImWarning className={styles.icon} />
        <div className={styles.titleTexts}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </header>
      <div className={styles.actionButtons}>
        <DefaultButton onClick={() => setShowModal(false)} type={"button"}>
          Cancelar
        </DefaultButton>
        <DefaultButton onClick={onClickConfirm} type={"submit"}>
          Confirmar
        </DefaultButton>
      </div>
    </div>
  );
};
