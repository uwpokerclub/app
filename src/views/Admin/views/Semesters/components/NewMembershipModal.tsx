import React, { ReactElement, useEffect, useState } from "react";

import Modal from "../../../../../shared/components/Modal/Modal";

import { useParams } from "react-router";

import Select from "react-select";

import { Membership, User } from "../../../../../types";

import "./NewMembershipModal.scss";
import { faculties } from "../../../../../constants";
import useFetch from "../../../../../hooks/useFetch";

type UserSelectionType = {
  value: string;
  label: string;
};

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
  onMemberSubmit,
  onUserSubmit,
}: {
  show: boolean;
  onClose: () => void;
  onMemberSubmit: (userId: string, paid: boolean, discounted: boolean) => void;
  onUserSubmit: (
    user: Partial<User>,
    paid: boolean,
    discounted: boolean,
  ) => Promise<boolean>;
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

  const [errorMessage, setErrorMessage] = useState("");

  // Will fetch all the users that are not already registered for this semester
  const { data: usersData } = useFetch<User[]>("users");
  const { data: memberships } = useFetch<Membership[]>(
    `memberships?semesterId=${semesterId}`,
  );

  useEffect(() => {
    if (usersData && memberships) {
      const userIds = usersData.map((u) => u.id);
      const membershipUserIds = memberships.map((m: Membership) => m.userId);

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
          })),
      );
    }
  }, [usersData, memberships]);

  const handleSubmit = (): void => {
    if (showExistingUserTab) {
      onMemberSubmit(userId, paid, discounted);
      setUserId("");
      setPaid(false);
      setDiscounted(false);
    } else {
      onUserSubmit(
        {
          id,
          firstName,
          lastName,
          email,
          faculty,
          questId,
        },
        paid,
        discounted,
      ).then((success) => {
        if (success) {
          setId("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setFaculty("");
          setQuestId("");
          setPaid(false);
          setDiscounted(false);
          setErrorMessage("");
        } else {
          setErrorMessage(
            "Failed to create the user. Either they already exist or the server has errored.",
          );
        }
      });
    }
  };

  return (
    <Modal
      title="New Membership"
      onClose={onClose}
      onSubmit={handleSubmit}
      show={show}
    >
      <div className="MembershipModal__tabs">
        <div
          className={`MembershipModal__tab ${
            showExistingUserTab ? "MembershipModal__tab-active" : ""
          }`}
          onClick={() => setShowExistingUserTab(true)}
        >
          <span>Existing User</span>
        </div>
        <div
          className={`MembershipModal__tab ${
            !showExistingUserTab ? "MembershipModal__tab-active" : ""
          }`}
          onClick={() => setShowExistingUserTab(false)}
        >
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
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
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
  );
}

export default NewMembershipModal;
