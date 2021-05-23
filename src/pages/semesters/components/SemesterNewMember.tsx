import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Membership, User } from "../../../types";

export default function SemesterNewMember(): ReactElement {
  const history = useHistory();
  const { semesterId } = useParams<{ semesterId: string }>();

  const [userId, setUserId] = useState("");
  const [paid, setPaid] = useState(false);

  const [users, setUsers] = useState<User[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch(`/api/memberships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        semesterId,
        userId,
        paid,
      }),
    }).then(() => history.push(`/semesters/${semesterId}`));
  };

  // Will fetch all the users that are not already registered for this semester
  useEffect(() => {
    const requests = [];

    requests.push(fetch(`/api/users`).then((res) => res.json()));
    requests.push(
      fetch(`/api/memberships?semesterId=${semesterId}`).then((res) =>
        res.json()
      )
    );

    Promise.all(requests).then(([userData, membershipData]) => {
      const userIds: string[] = userData.users.map((u: User) => u.id);
      const membershipUserIds: string[] = membershipData.memberships.map(
        (m: Membership) => m.user_id
      );

      const userSet = new Set(userIds);
      const memberSet = new Set(membershipUserIds);

      const unregisteredUserSet = setDifference(userSet, memberSet);

      const unregisteredUserIds = Array.from(unregisteredUserSet);

      setUsers(
        userData.users.filter((u: User) => unregisteredUserIds.includes(u.id))
      );
    });
  }, [semesterId]);

  return (
    <div className="row">
      <div className="col-md-3" />
      <div className="col-md-6">
        <h3 style={{ marginBottom: "1rem" }}>Add New Member</h3>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>User</label>
            <select
              className="form-control"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name} {u.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Paid</label>
            <input
              type="checkbox"
              className="form-control"
              onChange={() => setPaid(!paid)}
            ></input>
          </div>

          <div className="form-group center">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-3" />
    </div>
  );
}

function setDifference(setA: Set<string>, setB: Set<string>): Set<string> {
  const difference = new Set(setA);
  for (const e of setB) {
    difference.delete(e);
  }

  return difference;
}
