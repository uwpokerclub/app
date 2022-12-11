import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import Select from "react-select";
import useFetch from "../../../../../hooks/useFetch";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";

import { Membership, User } from "../../../../../types";

type UserSelectionType = {
  value: string;
  label: string;
};

function NewMembership(): ReactElement {
  const { semesterId } = useParams<{ semesterId: string }>();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [paid, setPaid] = useState(false);
  const [discounted, setDiscounted] = useState(false);

  const [users, setUsers] = useState<UserSelectionType[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    sendAPIRequest("memberships", "POST", {
      semesterId,
      userId,
      paid,
      discounted,
    }).then(() => navigate(`../${semesterId}`));
  };

  // Will fetch all the users that are not already registered for this semester
  const { data: usersData } = useFetch<User[]>("users");
  const { data: membershipsData } = useFetch<Membership[]>(
    `memberships?semesterId=${semesterId}`
  );

  useEffect(() => {
    if (usersData && membershipsData) {
      const userIds = usersData.map((u: User) => u.id);
      const membershipUserIds = membershipsData.map(
        (m) => m.userId
      );
      const userSet = new Set(userIds);
      const memberSet = new Set(membershipUserIds);

      const unregisteredUserSet = setDifference(userSet, memberSet);

      const unregisteredUserIds = Array.from(unregisteredUserSet);

      setUsers(
        usersData
          .filter((u) => unregisteredUserIds.includes(u.id))
          .map((u) => ({
            value: u.id,
            label: `${u.firstName} ${u.lastName}`,
          }))
      );
    }
  }, [usersData, membershipsData]);

  return (
    <div className="row">
      <div className="col-md-3" />
      <div className="col-md-6">
        <h3 style={{ marginBottom: "1rem" }}>Add New Member</h3>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>User</label>
            <Select
              options={users}
              onChange={(e) => {
                if (!e?.value) {
                  return;
                }

                setUserId(e?.value);
              }}
            />
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">Paid</label>
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setPaid(!paid)}
            ></input>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">Discounted</label>
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setDiscounted(!discounted)}
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
  for (const e of Array.from(setB)) {
    difference.delete(e);
  }

  return difference;
}

export default NewMembership;
