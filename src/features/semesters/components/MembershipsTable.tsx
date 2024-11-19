import { useMemo, useState } from "react";
import { useFetch } from "../../../hooks";
import { Membership } from "../../../types";
import { sendAPIRequest } from "../../../lib";
import { NewMembershipModal } from "./NewMembershipModal";

import styles from "./MembershipsTable.module.css";

type MembershipsTableProps = {
  semesterId: string;
};

export function MembershipsTable({ semesterId }: MembershipsTableProps) {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: memberships, setData: setMemberships } = useFetch<Membership[]>(`memberships?semesterId=${semesterId}`);
  const filteredMemberships = useMemo(() => {
    return (
      memberships?.filter((member) =>
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(query.toLowerCase()),
      ) || []
    );
  }, [query, memberships]);

  const updateMembership = (membershipId: string, isPaid: boolean, isDiscounted: boolean) => {
    sendAPIRequest(`memberships/${membershipId}`, "PATCH", {
      paid: isPaid,
      discounted: isDiscounted,
    }).then(({ status }) => {
      if (status === 200) {
        setMemberships(
          (members) =>
            members?.map((m) => {
              if (m.id !== membershipId) return m;

              return {
                ...m,
                paid: isPaid,
                discounted: isDiscounted,
              };
            }) || [],
        );
      }
    });
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Memberships ({filteredMemberships.length})</h3>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            className="form-control search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button type="button" className=" btn btn-primary" onClick={() => setShowModal(true)}>
            New member
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
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
                <td>{m.userId}</td>

                <td>{m.firstName}</td>

                <td>{m.lastName}</td>

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
      </div>

      <NewMembershipModal show={showModal} onClose={() => setShowModal(false)} semesterId={semesterId} />
    </>
  );
}
