import { useState } from "react";
import { useFetch } from "../../../hooks";
import { sendAPIRequest } from "../../../lib";
import { Transaction } from "../../../types";
import { NewTransactionModal } from "./NewTransactionModal";

import styles from "./TransactionsTable.module.css";

type TransactionsTableProps = {
  semesterId: string;
};

export function TransactionsTable({ semesterId }: TransactionsTableProps) {
  const { data: transactions, setData: setTransactions } = useFetch<Transaction[]>(
    `semesters/${semesterId}/transactions`,
  );

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: number) => {
    const { status } = await sendAPIRequest(`semesters/${semesterId}/transactions/${id}`, "DELETE");
    if (status === 204) {
      const { data } = await sendAPIRequest<Transaction[]>(`semesters/${semesterId}/transactions`);
      if (data) {
        setTransactions(data);
      }
    }
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Transactions</h3>
        <button
          data-qa="new-transaction-btn"
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          New transaction
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>

            <th>Description</th>

            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((t) => (
            <tr data-qa={`transaction-${t.id}`} key={t.id}>
              <td data-qa={`${t.id}-id`}>{t.id}</td>

              <td data-qa={`${t.id}-description`}>{t.description}</td>

              <td data-qa={`${t.id}-amount`}>
                {t.amount >= 0 ? `$${Number(t.amount).toFixed(2)}` : `-$${Number(t.amount * -1).toFixed(2)}`}
              </td>

              <td style={{ textAlign: "right" }}>
                <button
                  data-qa={`${t.id}-delete-btn`}
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) || <></>}
        </tbody>
      </table>

      <NewTransactionModal show={showModal} onClose={() => setShowModal(false)} semesterId={semesterId} />
    </>
  );
}
