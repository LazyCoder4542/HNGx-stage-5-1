import React, { createContext, useState, useContext, useCallback } from "react";

const PopupContext = createContext<IPopupContext | null>(null);

interface IProps {
  children: React.ReactNode;
}
type IPopupContext = {
    value: React.ReactNode | null;
    status: "success" | "error";
    triggerPopup: (child: React.ReactNode, status: 'error' | 'success') => void;
    clearPopup: () => void;
  };

export const PopupProvider = ({ children }: IProps) => {
  const [value, setValue] = useState<React.ReactNode | null>(null);
  const [status, setStatus] = useState<"success" | "error">("success");
  const triggerPopup = useCallback((child: React.ReactNode, status: 'error' | 'success') => {setValue(child); setStatus(status)}, []);
  const clearPopup = useCallback(() => setValue(null), []);
  console.log("here");
  
  return (
    <PopupContext.Provider value={{ value, status, triggerPopup, clearPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
export type { IPopupContext };
