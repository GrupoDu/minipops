import styles from "./styles.module.scss";
import { CSSProperties, useEffect } from "react";
import { ImWarning } from "react-icons/im";
import DefaultButton from "@/components/defaultButton";

type ModalProps = {
  type: "warning" | "confirm";
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onClickConfirm: () => void;
};

function escapeKeyHandler(
  e: KeyboardEvent,
  setShowModal: (show: boolean) => void,
) {
  if (e.key === "Escape") setShowModal(false);
}

export const Modal = (props: ModalProps) => {
  const { type, onClickConfirm, showModal, setShowModal } = props;

  const WARNING_TEXT = "Essa ação não poderá ser recuperada.";
  const CONFIRM_TEXT = "Deseja confirmar a ação?";
  const title = type === "warning" ? "Aviso!" : "Confirmar";
  const text = type === "warning" ? WARNING_TEXT : CONFIRM_TEXT;

  const warningStyle: CSSProperties = {
    background: "var(--warning-gradient)",
  };
  const confirmStyle: CSSProperties = {
    background: "var(--confirm-gradient)",
  };

  const titleStyle = type === "warning" ? warningStyle : confirmStyle;

  useEffect(() => {
    if (document !== undefined) {
      document.addEventListener("keydown", (e) =>
        escapeKeyHandler(e, setShowModal),
      );
    }
  }, []);

  return (
    <div className={`${styles.modalContainer} ${showModal && styles.show}`}>
      <header style={titleStyle}>
        <ImWarning className={styles.icon} />
        <div className={styles.titleTexts}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </header>
      <div
        className={`${styles.actionButtons} ${!showModal && styles.disable}`}
      >
        <DefaultButton
          onClick={() => setShowModal(false)}
          type={"button"}
          className={`${!showModal && styles.disable}`}
        >
          Cancelar
        </DefaultButton>
        <DefaultButton
          onClick={onClickConfirm}
          type={"submit"}
          className={`${!showModal && styles.disable}`}
        >
          Confirmar
        </DefaultButton>
      </div>
    </div>
  );
};
