"use client";

import { ModalContext } from "@/contexts/modal.context";
import { useState } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"warning" | "confirm">("warning");

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, setModalType, modalType }}
    >
      {children}
    </ModalContext.Provider>
  );
};
