import { Dispatch, LegacyRef, SetStateAction, useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  dialogMessage: string[];
  isError: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Dialog({
  dialogMessage,
  isError,
  isModalOpen,
  setIsModalOpen,
}: DialogProps) {
  const modalRef: LegacyRef<HTMLDialogElement> = useRef(null);

  const dialogBoxStyles = `${styles.mainDialog} ${
    isError ? styles.mainDialogError : styles.mainDialogOk
  }`;

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.showModal();
    } else {
      console.log(isModalOpen);
      modalRef.current?.close();
    }
  }, [isModalOpen]);

  return (
    <dialog className={dialogBoxStyles} ref={modalRef}>
      <div className={styles.dialogContent}>
        {dialogMessage.map((line) => (
          <p key={styles.dialogText} className={styles.dialogText}>
            {line}
          </p>
        ))}
        <button
          className={styles.dialogButton}
          onClick={(event) => {
            event.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          Ok
        </button>
      </div>
    </dialog>
  );
}
