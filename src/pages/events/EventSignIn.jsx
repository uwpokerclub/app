import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";

import "./Events.scss";

export default function EventSignIn() {
  const history = useHistory();
  const { event_id } = useParams();
  const set = new Set();

  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [semesterId, setSemesterId] = useState("");
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
        event_id,
        newParticipants
      })
    });

    if (res.status === 201) {
      return history.push(`/events/${event_id}`);
    }
  };

  useEffect(() => {

    fetch(`/api/events/${event_id}`)
      .then((res) => res.json())
      .then((eventData) => {
        setSemesterId(eventData.event.semester_id);

        fetch(`/api/users?semesterId=${semesterId}`)
          .then((res) => res.json())
          .then((membersData) => setMembers(membersData.users.filter((user) => participants.indexOf(user.id) === -1)));

      });
    fetch(`/api/participants/?eventId=${event_id}`)
      .then((res) => res.json())
      .then((participantsData) => setParticipants(participantsData.participants.map((participant) => participant.user_id)));

    //onClick={setIsChecked(!isChecked)}
  }, []);

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
                setSelectedMembers(selectedMembers.delete(e.target.value));
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
                  <Member member={member} />
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
