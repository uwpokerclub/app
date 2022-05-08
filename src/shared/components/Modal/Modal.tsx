import React, { ReactElement, ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.scss"

function Modal({
  title,
  show,
  onClose,
  onSubmit,
  children
}: {
  title: string;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
}): ReactElement {
  const nodeRef = useRef(null);

  return ReactDOM.createPortal(
    <CSSTransition nodeRef={nodeRef} classNames="Modal" in={show} unmountOnExit timeout={{ enter: 0, exit: 300}}>
      <div ref={nodeRef} className="Modal" onClick={onClose}>
        <div className="Modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="Modal__header">
            <h4 className="Modal__title">{title}</h4>
          </div>

          <div className="Modal__body">{children}</div>

          <div className="Modal__footer d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-outline-danger" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root") as HTMLElement
  );
}

export default Modal;