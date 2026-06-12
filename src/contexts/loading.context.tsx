"use client";

import React, { createContext, Dispatch } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);
