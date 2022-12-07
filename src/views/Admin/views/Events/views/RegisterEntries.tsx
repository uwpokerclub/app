import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, Membership } from "../../../../../types";

import "./Events.scss";

function RegisterEntires(): ReactElement {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Membership[]>([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set<string>());

  const registerMembersForEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const newParticipants = Array.from(selectedMembers);

    const requests = [];
    for (const p of newParticipants) {
      const res = fetch("/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: Number(eventId),
          membershipId: p,
        }),
      });

      requests.push(res)
    }

    Promise.all(requests).then((res) => {
      if (res[0].status === 201) {
        navigate(`../${eventId}`)
      }
    })
  };

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((event) => {
        fetch(`/api/participants?eventId=${eventId}`)
          .then((res) => res.json())
          .then((participants) => {
            fetch(`/api/memberships?semesterId=${event.semesterId}`)
              .then((res) => res.json())
              .then((memberships) => {
                setMembers(
                  memberships.filter(
                    (member: Membership) =>
                      !new Set(
                        participants.map(
                          (entry: Entry) => entry.membershipId
                        )
                      ).has(member.id)
                  )
                );
                setIsLoading(false);
              });
          });
      });
  }, [eventId]);
  return (
    <div className="row">
      {!isLoading && (
        <>
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="Participants">
              <h3 className="center bold">Sign In Members</h3>

              <form onSubmit={registerMembersForEvent}>
                {members.map((member) => (
                  <div key={member.id} className={`Participants__item ${Number(member.attendance) >= 1 && !member.paid ? "Participants__item-danger" : ""}`}>
                    <div className="Participants__item-checkbox">
                      <input
                        type="checkbox"
                        name="selected"
                        value={member.id}
                        defaultChecked={selectedMembers.has(member.id)}
                        onChange={(e) => {
                          if (selectedMembers.has(e.target.value)) {
                            const selectedMembersCopy = selectedMembers;
                            selectedMembersCopy.delete(e.target.value);
                            setSelectedMembers(selectedMembersCopy);
                          } else {
                            setSelectedMembers(
                              selectedMembers.add(e.target.value)
                            );
                          }
                        }}
                      />
                    </div>

                    <div className="Participants__item-title">
                      <span>
                        {member.firstName} {member.lastName}
                      </span>
                    </div>

                    <div className="Participants__item-student_id">
                      <span>{member.userId}</span>
                    </div>
                  </div>
                ))}

                <div className="Participants__submit">
                  <div className="row">
                    <button type="submit" className="mx-auto btn btn-primary">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3" />
        </>
      )}
    </div>
  );
}

export default RegisterEntires;