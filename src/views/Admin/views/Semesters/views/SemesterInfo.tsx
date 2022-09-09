import React, { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Membership, Semester, Transaction } from "../../../../../types";
import NewMembershipModal from "../components/NewMembershipModal";
import NewTransactionModal from "../components/NewTransactionModal";

import "./style.scss";

function SemesterInfo(): ReactElement {
  const { semesterId } = useParams<{ semesterId: string }>();

  const [semester, setSemester] = useState<Semester>();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  useEffect(() => {
    fetch(`/api/semesters/${semesterId}`)
      .then((res) => res.json())
      .then((data) => {
        setSemester(data.semester);
      });

    fetch(`/api/memberships?semesterId=${semesterId}`)
      .then((res) => res.json())
      .then((data) => {
        setMemberships(data.memberships);
      });

    fetch(`/api/semesters/${semesterId}/transactions`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.transactions);
      });
  }, [semesterId]);

  const updateMembership = (membershipId: string, isPaid: boolean, isDiscounted: boolean) => {
    fetch(`/api/memberships/${membershipId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paid: isPaid,
        discounted: isDiscounted
      }),
    });

    setMemberships(
      memberships.map((m) => {
        if (m.id !== membershipId) return m;

        return {
          ...m,
          paid: isPaid,
          discounted: isDiscounted
        };
      })
    );
  };

  const onTransactionSubmit = (description: string, amount: number): void => {
    fetch(`/api/semesters/${semesterId}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description,
        amount
      })
    }).then((res) => {
      if (res.status === 201) {
        fetch(`/api/semesters/${semesterId}/transactions`)
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.transactions);
        });  
      }
    });

    setShowTransactionModal(false);
  }

  const onMembershipSubmit = (userId: string, paid: boolean, discounted: boolean): void => {
    fetch(`/api/memberships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        semesterId,
        userId,
        paid,
        discounted
      }),
    }).then((res) => setShowMembershipModal(false));
  };

  const handleDelete = (id: number): void => {
    fetch(`/api/semesters/${semesterId}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status === 200) {
        fetch(`/api/semesters/${semesterId}/transactions`)
          .then((res) => res.json())
          .then((data) => {
            setTransactions(data.transactions);
        });
      }
    });
  }

  return (
    <div>
      <div className="Semester__highlights">
        <div className="card Semester__highlight-item">
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.starting_budget).toLocaleString("en-US", { style: "currency", currency: "USD"})}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Starting Budget</h6>
          </div>
        </div>

        <div className="card Semester__highlight-item">
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.current_budget).toLocaleString("en-US", { style: "currency", currency: "USD"})}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Current Budget</h6>
          </div>
        </div>

        <div className="card Semester__highlight-item">
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.membership_fee).toLocaleString("en-US", { style: "currency", currency: "USD"})}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Membership Fee</h6>
          </div>
        </div>

        <div className="card Semester__highlight-item">
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.membership_discount_fee).toLocaleString("en-US", { style: "currency", currency: "USD"})}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Membership Fee (Discounted)</h6>
          </div>
        </div>
    
        <div className="card Semester__highlight-item">
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.rebuy_fee).toLocaleString("en-US", { style: "currency", currency: "USD"})}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Rebuy Fee</h6>
          </div>
        </div>
      </div>

      <div className="Memberships__header">
        <h3>Memberships ({memberships.length})</h3>
        <Link to={`new-member`} className="btn btn-primary">
          Add member
        </Link>
        <button type="button" className="btn btn-primary" onClick={() => setShowMembershipModal(true)}>Modal</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Student ID</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Paid</th>

            <th>Discounted</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {memberships.map((m) => (
            <tr key={m.id}>
              <td>{m.user_id}</td>

              <td>{m.first_name}</td>

              <td>{m.last_name}</td>

              <td>{m.paid ? "Yes" : "No"}</td>

              <td>{m.discounted ? "Yes" : "No"}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateMembership(m.id, !m.paid, m.discounted)}
                >
                  Set {m.paid ? "Unpaid" : "Paid"}
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateMembership(m.id, m.paid, !m.discounted)}
                >
                  {m.discounted ? "Remove Discount" : "Discount"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="Transactions__header">
        <h3>Transactions</h3>
        <button type="button" className="btn btn-primary" onClick={() => setShowTransactionModal(true)}>New transaction</button>
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
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>

              <td>{t.description}</td>

              <td>{t.amount >= 0 ? `$${Number(t.amount).toFixed(2)}` : `-$${Number(t.amount * -1).toFixed(2)}`}</td>

              <td style={{ textAlign: "right" }}>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NewTransactionModal 
        show={showTransactionModal} 
        onClose={() => setShowTransactionModal(false)} 
        onSubmit={onTransactionSubmit} 
      />

      <NewMembershipModal
        show={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
        onSubmit={onMembershipSubmit}
      />
    </div>
  );
}

export default SemesterInfo;
