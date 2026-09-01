"use client";

import styles from "./styles.module.scss";
import { MdPrint } from "react-icons/md";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { usePathname } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";

async function getDocument(id?: string) {
  const response = await api.get(`pdfGenerator/${id}`);
  return response.data;
}

function transformDataToBlob(data: string) {
  const bytes = Uint8Array.fromBase64(data);
  return new Blob([bytes], { type: "application/pdf" });
}

function PrintButton() {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const id = pathname.split("/").pop();

  const handleDocument = async () => {
    setIsLoading(true);

    try {
      const data = await getDocument(id);
      const blob = transformDataToBlob(data);

      const fileUrl = URL.createObjectURL(blob);
      window.open(fileUrl, "_blank");
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      className={`${styles.printButton} ${isLoading ? styles.disabled : ""}`}
      onClick={async () => await handleDocument()}
    >
      <MdPrint size={20} />
      Imprimir Pedido
    </button>
  );
}

export default PrintButton;
