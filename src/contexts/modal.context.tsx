"use client";

import { createContext } from "react";

type ModalContextType = {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  setModalType: (value: "warning" | "confirm") => void;
  modalType: "warning" | "confirm";
};

export const ModalContext = createContext<ModalContextType | null>(null);
