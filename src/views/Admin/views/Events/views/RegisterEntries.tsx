import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";
import { Entry, Event, Membership } from "../../../../../types";

import "./Events.scss";

function RegisterEntires(): ReactElement {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Membership[]>([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set<string>());
  const [query, setQuery] = useState("");

  const filteredMembers = members.filter((m) => RegExp(query, "i").test(`${m.firstName} ${m.lastName}`))

  const registerMembersForEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newParticipants = Array.from(selectedMembers);

    const requests = [];
    for (const p of newParticipants) {
      const res = sendAPIRequest("participants", "POST", {
        eventId: Number(eventId),
        membershipId: p,
      });

      requests.push(res);
    }

    Promise.all(requests).then((res) => {
      if (res[0].status === 201) {
        navigate(`../${eventId}`);
      }
    });
  };

  const { data: event } = useFetch<Event>(`events/${eventId}`);
  const { data: participants } = useFetch<Entry[]>(
    `participants?eventId=${eventId}`
  );
  const { data: memberships } = useFetch<Membership[]>(
    `memberships?semesterId=${event ? event.semesterId : ""}`
  );

  useEffect(() => {
    if (memberships && participants) {
      setMembers(
        memberships.filter(
          (member: Membership) =>
            !new Set(
              participants.map((entry: Entry) => entry.membershipId)
            ).has(member.id)
        )
      );

      setIsLoading(false);
    }
  }, [memberships, participants]);
  return (
    <div className="row">
      {!isLoading && (
        <>
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="Participants">
              <h3 className="center bold">Sign In Members</h3>

              <div className="Participants__header">
                <input className="form-control" type="search" placeholder="Search" onChange={(e) => setQuery(e.target.value)}></input>
                <button className="btn btn-primary" onClick={registerMembersForEvent}>Sign In</button>
              </div>
              <form className="Participants__list">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`Participants__item ${
                      Number(member.attendance) >= 1 && !member.paid
                        ? "Participants__item-danger"
                        : ""
                    }`}
                  >
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
