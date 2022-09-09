import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Membership, Semester, Transaction } from "../../../../../types";
import NewTransactionModal from "../components/NewTransactionModal";

import "./style.scss";

function SemesterInfo(): ReactElement {
  const { semesterId } = useParams<{ semesterId: string }>();

  const [semester, setSemester] = useState<Semester>();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [filteredMemberships, setFilteredMemberships] = useState<Membership[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [query, setQuery] = useState("");
  const handleSearch = (search: string): void => {
    setQuery(search);

    if (!search) {
      setFilteredMemberships(memberships);
      return;
    }

    setFilteredMemberships(
      memberships.filter((m) => RegExp(search, "i").test(`${m.first_name} ${m.last_name}`))
    );
  }

  const [showModal, setShowModal] = useState(false);

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
        setFilteredMemberships(data.memberships)
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

    setFilteredMemberships(
      filteredMemberships.map((m) => {
        if (m.id !== membershipId) return m;

        return {
          ...m,
          paid: isPaid,
          discounted: isDiscounted
        };
      })
    );
  };

  const onSubmit = (description: string, amount: number): void => {
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

    setShowModal(false);
  }

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
        <div className="Memberships__header__search">
          <input
            type="text"
            placeholder="Search..."
            className="form-control search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          ></input>
          <Link to={`new-member`} className="btn btn-primary Memberships__header__search-button">
            Add member
          </Link>
        </div>
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
          {filteredMemberships.map((m) => (
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
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>New transaction</button>
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
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={onSubmit} 
      />
    </div>
  );
}

export default SemesterInfo;
