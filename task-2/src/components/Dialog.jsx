import React from "react";
import styles from "./Dialog.module.css";

function Dialog({ isOpen, setIsOpen, onConfirm }) {
  return (
    <div>
      <dialog open={isOpen} id="confirmDialog">
        <h2 className={styles.dialogHeader}>
          <b>Are you sure?</b>
        </h2>

        <div className={styles.actions}>
          <button
            className={styles.cancel}
            id="closeDialog"
            onClick={() => setIsOpen(!isOpen)}
          >
            CANCEL
          </button>

          <button className={styles.confirm} type="submit" onClick={onConfirm}>
            CONFIRM
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default Dialog;
