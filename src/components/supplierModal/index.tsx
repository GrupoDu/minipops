"use client";

import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const SupplierModal = ({ slug }: { slug: string }) => {
  const { showModal, setShowModal } = useModal();
  const router = useRouter();

  const handleDeleteSupplier = async () => {
    try {
      await api.delete(`/suppliers/${slug}`);

      router.push("/fornecedores");
      toast.success("Fornecedor removido com sucesso.");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  return (
    <Modal
      type={"warning"}
      onClickConfirm={handleDeleteSupplier}
      setShowModal={setShowModal}
      showModal={showModal}
    />
  );
};
