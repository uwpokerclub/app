import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { sendAPIRequest } from "../../../lib";
import { Membership, getEligibleMembers } from "../../../sdk/memberships";

import styles from "./EventRegister.module.css";

export function EventRegister() {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<(Membership & { selected: boolean })[]>([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set<string>());
  const [query, setQuery] = useState("");

  useEffect(() => {
    getEligibleMembers(Number(eventId))
      .then((eligibleMembers) => {
        setMembers(eligibleMembers.map((m) => ({ ...m, selected: false })));
      })
      .finally(() => setIsLoading(false));
  }, [eventId]);

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
                <button
                  data-qa="sign-in-btn"
                  style={{ whiteSpace: "nowrap" }}
                  className="btn btn-primary"
                  onClick={registerMembers}
                >
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
                    <div data-qa={`member-${member.id}`} className={styles.itemCheckbox}>
                      <input
                        data-qa="checkbox-selected"
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
