import { Dispatch, LegacyRef, SetStateAction, useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  dialogMessage: string;
  dialogButtonMessage: string;
  error: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Dialog({
  dialogMessage,
  dialogButtonMessage,
  error,
  isModalOpen,
  setIsModalOpen,
}: DialogProps) {
  const modalRef: LegacyRef<HTMLDialogElement> = useRef(null);

  const dialogBoxStyles = error ? styles.dialogBoxError : styles.dialogBox;

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef}>
      <div className={dialogBoxStyles}>
        <p className={styles.dialogText}>{dialogMessage}</p>
        <button
          className={styles.dialogButton}
          onClick={(event) => {
            event.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          {dialogButtonMessage}
        </button>
      </div>
    </dialog>
  );
}
