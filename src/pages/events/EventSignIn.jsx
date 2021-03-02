import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";

import "./Events.scss";

export default function EventSignIn() {
  const history = useHistory();
  const { event_id } = useParams();
  const set = new Set();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(set);

  const registerMembersForEvent = async (e) => {
    e.preventDefault();
    const newParticipants = Array.from(selectedMembers);

    const res = await fetch("/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId: event_id,
        participants: newParticipants
      })
    });

    if (res.status === 200) {
      return history.push(`/events/${event_id}`);
    }
  };

  useEffect(() => {
    fetch(`/api/events/${event_id}`)
      .then((res) => res.json())
      .then((eventData) => {

        fetch(`/api/participants/?eventId=${event_id}`)
          .then((res) => res.json())
          .then((participantsData) => {

          fetch(`/api/users?semesterId=${eventData.event.semester_id}`)
            .then((res) => res.json())
            .then((membersData) => {
              setMembers(membersData.users.filter((user) => !new Set(participantsData.participants.map((participant) => participant.id)).has(user.id)));
              setIsLoading(false);
            });
        });
      });

  }, [event_id]);

  const Member = ({ member }) => {
    return (
      <div className="Participants__item">

        <div className="Participants__item-checkbox">
          <input
            type="checkbox"
            name="selected"
            value={member.id}
            defaultChecked={selectedMembers.has(member.id)}
            onClick={(e) => {
              if (selectedMembers.has(e.target.value)) {
                const selectedMembersCopy = selectedMembers;
                selectedMembersCopy.delete(e.target.value);
                setSelectedMembers(selectedMembersCopy);
              } else {
                setSelectedMembers(selectedMembers.add(e.target.value));
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
          <span>
            {member.id}
          </span>
        </div>

      </div>
    );
  };

  return (
    <div className="row">
      {!isLoading && (
        <>
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="Participants">

              <h3 className="center bold">
                Sign In Members
              </h3>

              <form onSubmit={registerMembersForEvent}>

                {members.map((member) => (
                  <Member key={member.id} member={member} />
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
