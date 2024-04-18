import { useState } from "react";

export function useDialog(): [
  (error: boolean, ...message: string[]) => void,
  string[],
  boolean,
  boolean,
  any
] {
  const [dialogMessage, setDialogMessage] = useState([""]);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDialog = (error: boolean, ...message: string[]) => {
    console.log("abrir dialog");
    setDialogMessage(message);
    setIsModalOpen(true);
    setIsError(error);
  };
  return [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen];
}
