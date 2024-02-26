import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const Modal = ({ children, open, className = "", onClose }) => {
  const dialogRef = useRef();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog.showModal();
    }
    return () => dialog.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
