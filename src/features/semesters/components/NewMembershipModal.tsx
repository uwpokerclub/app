import { ChangeEvent, useEffect, useState } from "react";
import Select from "react-select";
import { Modal } from "../../../components";
import { useFetch } from "../../../hooks";
import { Membership, User } from "../../../types";
import { setDifference } from "../utils";
import { FACULTIES } from "../../../data";

import styles from "./NewMembershipModal.module.css";
import { sendAPIRequest } from "../../../lib";

type NewMembershipModalProps = {
  show: boolean;
  onClose: () => void;
  semesterId: string;
};

const defaultFormData = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  faculty: "",
  questId: "",
};

export function NewMembershipModal({ show, onClose, semesterId }: NewMembershipModalProps) {
  const [showMemberTab, setShowMemberTab] = useState(true);
  const [unregisteredUsers, setUnregisteredUsers] = useState<{ value: string; label: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [paid, setPaid] = useState(false);
  const [discounted, setDiscounted] = useState(false);

  const [formState, setFormState] = useState(defaultFormData);

  const [userId, setUserId] = useState("");

  const { data: users } = useFetch<User[]>("users");
  const { data: memberships } = useFetch<Membership[]>(`memberships?semesterId=${semesterId}`);

  useEffect(() => {
    if (!users || !memberships) {
      return;
    }

    const userIds = users.map((u) => u.id);
    const memberIds = memberships.map((m) => m.userId);

    const userSet = new Set(userIds);
    const memberSet = new Set(memberIds);

    const unregisteredUserIds = Array.from(setDifference(userSet, memberSet));

    setUnregisteredUsers(
      users
        .filter((u) => unregisteredUserIds.includes(u.id))
        .map((u) => ({
          value: u.id,
          label: `${u.firstName} ${u.lastName} (${u.id})`,
        })),
    );
  }, [memberships, users]);
  useEffect(() => {
    if (!users || !memberships) {
      return;
    }

    const userIds = users.map((u) => u.id);
    const memberIds = memberships.map((m) => m.userId);

    const userSet = new Set(userIds);
    const memberSet = new Set(memberIds);

    const unregisteredUserIds = Array.from(setDifference(userSet, memberSet));

    setUnregisteredUsers(
      users
        .filter((u) => unregisteredUserIds.includes(u.id))
        .map((u) => ({
          value: u.id,
          label: `${u.firstName} ${u.lastName} (${u.id})`,
        })),
    );
  }, [memberships, users]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (showMemberTab) {
      const { status } = await sendAPIRequest("memberships", "POST", {
        semesterId,
        userId,
        paid,
        discounted,
      });

      if (status !== 201) {
        setErrorMessage(
          "Failed to create the membership. Either this member is already registered or the server has errored.",
        );
        return;
      }
      onClose();
    } else {
      const { status: userStatus } = await sendAPIRequest("users", "POST", {
        id: Number(formState.id),
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        faculty: formState.faculty,
        questId: formState.questId,
      });

      if (userStatus !== 201) {
        setErrorMessage("Failed to create the user. Either they already exist or the server has errored.");
        return;
      }

      const { status: memberStatus } = await sendAPIRequest("memberships", "POST", {
        semesterId,
        userId: Number(formState.id),
        paid,
        discounted,
      });

      if (memberStatus !== 201) {
        setErrorMessage(
          "Failed to create the membership. Either this member is already registered or the server has errored.",
        );
        return;
      }

      onClose();
    }
    resetForms();
  };

  const resetForms = () => {
    setUserId("");
    setPaid(false);
    setDiscounted(false);
    setFormState(defaultFormData);
  };

  return (
    <Modal title="New Membership" onClose={onClose} onSubmit={handleSubmit} show={show}>
      <div className={styles.tabs}>
        <div className={showMemberTab ? styles.tabActive : styles.tab} onClick={() => setShowMemberTab(true)}>
          <span>Existing User</span>
        </div>
        <div className={!showMemberTab ? styles.tabActive : styles.tab} onClick={() => setShowMemberTab(false)}>
          <span>New User</span>
        </div>
      </div>
      {showMemberTab ? (
        <form>
          <div className="mb-3">
            <label>User</label>
            <Select options={unregisteredUsers} onChange={(e) => setUserId(e!.value)} />
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="mb-3">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              className="form-control"
              value={formState.firstName}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              className="form-control"
              value={formState.lastName}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="form-control"
              value={formState.email}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="faculty">Faculty:</label>
            <select name="faculty" className="form-control" value={formState.faculty} onChange={handleChange}>
              <option>Choose one</option>
              {FACULTIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="questId">Quest ID:</label>
            <input
              type="text"
              placeholder="Quest ID"
              name="questId"
              className="form-control"
              value={formState.questId}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="id">Student Number:</label>
            <input
              type="text"
              placeholder="Student Number"
              name="id"
              className="form-control"
              value={formState.id}
              onChange={handleChange}
            ></input>
          </div>
        </form>
      )}
      <div className="form-check form-check-inline">
        <label className="form-check-label">Paid</label>
        <input type="checkbox" className="form-check-input" onChange={() => setPaid(!paid)}></input>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label">Discounted</label>
        <input type="checkbox" className="form-check-input" onChange={() => setDiscounted(!discounted)}></input>
      </div>
    </Modal>
  );
}
