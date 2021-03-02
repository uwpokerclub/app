import React from "react";

import { useParams } from "react-router-dom";

import "./Events.scss";

export default function EventSignIn() {
  const { event_id } = useParams();
  const members = [
    {
      id: 0,
      first_name: "Bob",
      last_name: "Johnson",
    },
    {
      id: 1,
      first_name: "Deep",
      last_name: "Kalra",
    },
    {
      id: 2,
      first_name: "Adam",
      last_name: "Mahood",
    },
    {
      id: 3,
      first_name: "Sasha",
      last_name: "Nayar",
    },
    {
      id: 4,
      first_name: "Arham",
      last_name: "Abidi",
    },
  ];

  return (
    <div className="row">
      <div className="col-md-3" />
      <div className="col-md-6">
        <div className="Participants">
          <h3 className="center bold">Sign In Members</h3>

          <form>
            <input type="hidden" name="event_id" value={event_id} />

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
    </div>
  );
}

const Member = ({ member }) => {
  return (
    <div className="Participants__item">
      <div className="Participants__item-checkbox">
        <input type="checkbox" name="selected" value={member.id} />
      </div>

      <div className="Participants__item-title">
        <span>
          {member.first_name} {member.last_name}
        </span>
      </div>

      <div className="Participants__item-student_id">
        <span>{member.id}</span>
      </div>
    </div>
  );
};
