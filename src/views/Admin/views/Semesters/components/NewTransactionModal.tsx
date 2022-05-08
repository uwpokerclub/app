import React, { ReactElement, useState } from "react";

import Modal from "../../../../../shared/components/Modal/Modal";

function NewTransactionModal({
  show,
  onClose,
  onSubmit 
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (description: string, amount: number) => void;
}): ReactElement {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (): void => {
    onSubmit(description, Number(amount));
    setDescription("");
    setAmount("");
  }

  return (
    <Modal title="New transaction" onClose={onClose} onSubmit={handleSubmit} show={show}>
      <form>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input className="form-control" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </div>
      </form>
    </Modal>
  );
}

export default NewTransactionModal;