import { ReactNode, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.css";

type ModalProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  children: ReactNode;
  primaryButtonText?: string;
  primaryButtonType?: string;
  closeButtonText?: string;
  closeButtonType?: string;
};

export function Modal({
  title,
  show,
  primaryButtonText = "Submit",
  primaryButtonType = "primary",
  closeButtonText = "Close",
  closeButtonType = "outline-danger",
  onClose,
  onSubmit,
  children,
}: ModalProps) {
  const nodeRef = useRef(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmitClick = useCallback(async () => {
    submitButtonRef.current!.disabled = true;
    closeButtonRef.current!.disabled = true;
    await onSubmit();
    submitButtonRef.current!.disabled = false;
    closeButtonRef.current!.disabled = false;
  }, [onSubmit]);

  const handleCloseClick = useCallback(() => {
    submitButtonRef.current!.disabled = true;
    closeButtonRef.current!.disabled = true;
    onClose();
    submitButtonRef.current!.disabled = false;
    closeButtonRef.current!.disabled = false;
  }, [onClose]);

  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      classNames={{
        enterDone: styles.modalEnterDone,
        exit: styles.modalExit,
      }}
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div data-qa="modal" ref={nodeRef} className={styles.modal} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h4 data-qa="modal-title" className={styles.title}>
              {title}
            </h4>
          </div>

          <div className={styles.body}>{children}</div>

          <div className={`${styles.footer} d-grid gap-2 d-md-flex justify-content-md-end`}>
            <button
              ref={closeButtonRef}
              data-qa="modal-close-btn"
              type="button"
              className={`btn btn-${closeButtonType}`}
              onClick={handleCloseClick}
            >
              {closeButtonText}
            </button>
            <button
              ref={submitButtonRef}
              data-qa="modal-submit-btn"
              type="button"
              className={`btn btn-${primaryButtonType}`}
              onClick={handleSubmitClick}
            >
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root") as HTMLElement,
  );
}
