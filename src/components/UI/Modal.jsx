import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const Modal = ({ children, open, className = "" }) => {
  const dialogRef = useRef();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog.showModal();
    }
    return () => dialog.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
