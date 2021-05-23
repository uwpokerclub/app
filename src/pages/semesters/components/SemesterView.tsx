import React, { ReactElement, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Membership } from "../../../types";

import "./style.scss";

type Props = {
  semesterId: string;
};

export default function SemesterView({ semesterId }: Props): ReactElement {
  const { url } = useRouteMatch();

  const [memberships, setMemberships] = useState<Membership[]>([]);

  useEffect(() => {
    fetch(`/api/memberships?semesterId=${semesterId}`)
      .then((res) => res.json())
      .then((data) => {
        setMemberships(data.memberships);
      });
  }, [semesterId]);

  const updateMembership = (membershipId: string, isPaid: boolean) => {
    fetch(`/api/memberships/${membershipId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paid: !isPaid,
      }),
    });

    setMemberships(
      memberships.map((m) => {
        if (m.id !== membershipId) return m;

        return {
          ...m,
          paid: !isPaid,
        };
      })
    );
  };

  return (
    <div>
      <div className="Memberships__header">
        <h3>Memberships ({memberships.length})</h3>
        <Link to={`${url}/new-member`} className="btn btn-primary">
          Add Member
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Student ID</th>

            <th>First Name</th>

            <th>Last Name</th>

            <th>Paid</th>

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

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateMembership(m.id, m.paid)}
                >
                  Set {m.paid ? "Unpaid" : "Paid"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
