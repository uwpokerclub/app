import React, { ReactElement, useEffect, useState } from "react";

import Modal from "../../../../../shared/components/Modal/Modal";

import { useNavigate, useParams } from "react-router";

import Select from "react-select";

import { Membership, User } from "../../../../../types";

import "./NewMembershipModal.scss"
import { faculties } from "../../../../../constants";

type UserSelectionType = {
  value: string;
  label: string;
}


function setDifference(setA: Set<string>, setB: Set<string>): Set<string> {
  const difference = new Set(setA);
  for (const e of Array.from(setB)) {
    difference.delete(e);
  }

  return difference;
}

function NewMembershipModal({
  show,
  onClose,
  onSubmit,
}: {
  show: boolean;
  onClose: () => void;
  onSubmit: (userId: string, paid: boolean, discounted: boolean) => void;
}): ReactElement {
  const { semesterId } = useParams<{ semesterId: string }>();

  const [userId, setUserId] = useState("");
  const [paid, setPaid] = useState(false);
  const [discounted, setDiscounted] = useState(false);

  const [users, setUsers] = useState<UserSelectionType[]>([]);

  const [showExistingUserTab, setShowExistingUserTab] = useState(true);

  // Used for user from
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [questId, setQuestId] = useState("");
  const [id, setId] = useState("");

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
        userData.users
          .filter((u: User) => unregisteredUserIds.includes(u.id))
          .map((u: User) => ({
            value: u.id,
            label: `${u.first_name} ${u.last_name}`,
          }))
      );
    });
  }, [semesterId]);

  const handleSubmit = (): void => {
    onSubmit(userId, paid, discounted);
    setUserId("");
    setPaid(false);
    setDiscounted(false);
  }

  return (
    <Modal title="New Membership" onClose={onClose} onSubmit={handleSubmit} show={show}>
      <div className="MembershipModal__tabs">
        <div className={`MembershipModal__tab ${showExistingUserTab ? "MembershipModal__tab-active" : ""}`} onClick={() => setShowExistingUserTab(true)}>
          <span>Existing User</span>
        </div>
        <div className={`MembershipModal__tab ${!showExistingUserTab ? "MembershipModal__tab-active" : ""}`} onClick={() => setShowExistingUserTab(false)}>
          <span>New User</span>
        </div>
      </div>
      {showExistingUserTab ? (
        <form>
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
          </form>
      ) : (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            placeholder="First name"
            name="first_name"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            placeholder="Last name"
            name="last_name"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="faculty">Faculty:</label>
          <select
            name="faculty"
            className="form-control"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          >
            <option>Choose one</option>
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quest_id">Quest ID:</label>
          <input
            type="text"
            placeholder="Quest ID"
            name="quest_id"
            className="form-control"
            value={questId}
            onChange={(e) => setQuestId(e.target.value)}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="id">Student Number:</label>
          <input
            type="text"
            placeholder="Student Number"
            name="id"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>
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
      </form>
      )}

      
    </Modal>
  )
}

export default NewMembershipModal;