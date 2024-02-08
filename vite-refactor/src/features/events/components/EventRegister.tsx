import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Entry, Event, Membership } from "../../../types";
import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../lib";

import styles from "./EventRegister.module.css";

export function EventRegister() {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<(Membership & { selected: false })[]>([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set<string>());
  const [query, setQuery] = useState("");

  const { data: event } = useFetch<Event>(`events/${eventId}`);
  const { data: participants } = useFetch<Entry[]>(`participants?eventId=${eventId}`);
  const { data: memberships } = useFetch<Membership[]>(`memberships?semesterId=${event ? event.semesterId : ""}`);

  useEffect(() => {
    if (!participants || !memberships) return;

    setMembers(
      memberships
        .filter((member) => !new Set(participants.map((p) => p.membershipId)).has(member.id))
        .map((m) => ({ ...m, selected: false })),
    );

    setIsLoading(false);
  }, [memberships, participants]);

  const filteredMembers = members.filter((m) =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMembers.has(e.target.value)) {
      const selectedMembersCopy = selectedMembers;
      selectedMembersCopy.delete(e.target.value);
      setSelectedMembers(selectedMembersCopy);
    } else {
      setSelectedMembers(selectedMembers.add(e.target.value));
    }
  };

  const registerMembers = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntries = Array.from(selectedMembers);

    const requests = [];
    for (const p of newEntries) {
      requests.push(
        sendAPIRequest("participants", "POST", {
          eventId: Number(eventId),
          membershipId: p,
        }),
      );
    }

    const results = await Promise.all(requests);

    if (results[0].status === 201) {
      navigate(`../${eventId}`);
    }
  };

  return (
    <div className="row">
      {!isLoading && (
        <>
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className={styles.container}>
              <h3 className="text-center bold">Sign In Members</h3>

              <div className={styles.header}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
                <button style={{ whiteSpace: "nowrap" }} className="btn btn-primary" onClick={registerMembers}>
                  Sign In
                </button>
              </div>
              <form className={styles.list}>
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`${styles.item} ${
                      Number(member.attendance) >= 4 && !member.paid ? styles.itemDanger : ""
                    }`}
                  >
                    <div className={styles.itemCheckbox}>
                      <input
                        type="checkbox"
                        name="selected"
                        value={member.id}
                        defaultChecked={selectedMembers.has(member.id)}
                        onChange={handleSelect}
                      />
                    </div>

                    <div className={styles.itemTitle}>
                      <span>
                        {member.firstName} {member.lastName}
                      </span>
                    </div>

                    <div className={styles.itemStudentId}>
                      <span>{member.userId}</span>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="col-md-3" />
        </>
      )}
    </div>
  );
}
