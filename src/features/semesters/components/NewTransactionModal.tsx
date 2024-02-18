import { useState } from "react";
import { sendAPIRequest } from "../../../lib";
import { Modal } from "../../../components";

type NewTransactionModal = {
  show: boolean;
  onClose: () => void;
  semesterId: string;
};

export function NewTransactionModal({ show, onClose, semesterId }: NewTransactionModal) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    await sendAPIRequest(`semesters/${semesterId}/transactions`, "POST", {
      description,
      amount: Number(amount),
    });

    setDescription("");
    setAmount("");
    onClose();
  };

  return (
    <Modal title="New transaction" onClose={onClose} onSubmit={handleSubmit} show={show}>
      <form>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            className="form-control"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
      </form>
    </Modal>
  );
}
