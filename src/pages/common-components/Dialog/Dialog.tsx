import { LegacyRef, MutableRefObject } from "react";

interface DialogProps {
  dialogTittle: string;
  dialogMessage: string;
  dialogButtonMessage: string;
  modalRef: LegacyRef<HTMLDialogElement>;
}

export default function Dialog({
  dialogTittle,
  dialogMessage,
  dialogButtonMessage,
  modalRef,
}: DialogProps) {
  return (
    <dialog ref={modalRef}>
      <h3>{dialogTittle}</h3>
      <p>{dialogMessage}</p>
      <button>{dialogButtonMessage}</button>
    </dialog>
  );
}
