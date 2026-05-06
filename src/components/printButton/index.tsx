"use client";

import styles from "./styles.module.scss";
import { MdPrint } from "react-icons/md";

function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button className={styles.printButton} onClick={handlePrint}>
      <MdPrint size={20} />
      Imprimir Pedido
    </button>
  );
}

export default PrintButton;
