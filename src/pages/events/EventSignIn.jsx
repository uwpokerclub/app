import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";

import "./Events.scss";

export default function EventSignIn() {
  const history = useHistory();
  const { event_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [semesterId, setSemesterId] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const toggleMember = (e) => {
    e.preventDefault();

    if (e.target.checked) {
      setSelectedMembers(selectedMembers.push(e.target.value));
    } else {
      setSelectedMembers(selectedMembers.filter(
        member => member !== e.target.value
      ));
    }
  };

  const registerMembersForEvent = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        event_id,
        selectedMembers
      })
    });

    if (res.status === 201) {
      return history.push(`/events/${event_id}`);
    }
  };

  useEffect(() => {
    const requests = [];

    requests.push(fetch(`/api/events/${event_id}`).then((res) => res.json()));
    requests.push(fetch(`/api/participants/?eventId=${event_id}`).then((res) => res.json()));

    Promise.all(requests).then(([eventData, participantsData]) => {
      setSemesterId(eventData.event.semester_id);
      setParticipants(participantsData.participants.map((participant) => participant.user_id));
    });

    const membersRequest = [
      fetch(`/api/users?semesterId=${semesterId}`).then((res) => res.json())
    ];

    Promise.all(membersRequest).then(([membersData]) => {
      setMembers(membersData.users.filter((user) => participants.indexOf(user.id) === -1));
      setIsLoading(false);
    });
    //onClick={setIsChecked(!isChecked)}
  }, [event_id, participants, semesterId]);

  const Member = ({ member }) => {
    return (
      <div className="Participants__item">
  
        <div className="Participants__item-checkbox">
          <input 
            type="checkbox" 
            name="selected" 
            value={member.id}
            checked={isChecked}
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
