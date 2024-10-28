import { ReactNode, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.css";

type ModalProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
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

  const [disabled, setDisabled] = useState(false);

  const handleSubmitClick = () => {
    setDisabled(true);
    onSubmit();
    setDisabled(false);
  };

  const handleCloseClick = () => {
    setDisabled(true);
    onClose();
    setDisabled(false);
  };

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
              data-qa="modal-close-btn"
              type="button"
              className={`btn btn-${closeButtonType}`}
              onClick={handleCloseClick}
              disabled={disabled}
            >
              {closeButtonText}
            </button>
            <button
              data-qa="modal-submit-btn"
              type="button"
              className={`btn btn-${primaryButtonType}`}
              onClick={handleSubmitClick}
              disabled={disabled}
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
