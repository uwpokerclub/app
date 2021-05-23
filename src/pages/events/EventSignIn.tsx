import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Entry, Membership } from "../../types";

import "./Events.scss";

export default function EventSignIn(): ReactElement {
  const history = useHistory();
  const { eventId } = useParams<{ eventId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set());

  const registerMembersForEvent = async (e: FormEvent) => {
    e.preventDefault();
    const newParticipants = Array.from(selectedMembers);

    const res = await fetch("/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        participants: newParticipants,
      }),
    });

    if (res.status === 200) {
      return history.push(`/events/${eventId}`);
    }
  };

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((eventData) => {
        fetch(`/api/participants?eventId=${eventId}`)
          .then((res) => res.json())
          .then((participantsData) => {
            fetch(`/api/memberships?semesterId=${eventData.event.semester_id}`)
              .then((res) => res.json())
              .then((membersData) => {
                setMembers(
                  membersData.memberships.filter(
                    (member: Membership) =>
                      !new Set(
                        participantsData.participants.map(
                          (entry: Entry) => entry.user_id
                        )
                      ).has(member.user_id)
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
                  <div key={member.id} className="Participants__item">
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
                        {member.first_name} {member.last_name}
                      </span>
                    </div>

                    <div className="Participants__item-student_id">
                      <span>{member.user_id}</span>
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
