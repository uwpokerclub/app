import { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.css";

type ModalProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

export function Modal({ title, show, onClose, onSubmit, children }: ModalProps) {
  const nodeRef = useRef(null);

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
      <div ref={nodeRef} className={styles.modal} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h4 className={styles.title}>{title}</h4>
          </div>

          <div className={styles.body}>{children}</div>

          <div className={`${styles.footer} d-grid gap-2 d-md-flex justify-content-md-end`}>
            <button type="button" className="btn btn-outline-danger" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root") as HTMLElement,
  );
}
