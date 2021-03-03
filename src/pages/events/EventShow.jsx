import React, { useEffect, useState } from "react";

import {
  Link,
  Switch,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import "./Events.scss";

import EventSignIn from "./EventSignIn";

export default function EventShow() {
  const { path, url } = useRouteMatch();
  const { event_id } = useParams();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState({
    id: event_id,
    name: "",
    start_date: "",
    format: "",
    notes: "",
    semester_id: "",
    state: 0,
  });
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const searchParticipants = (e) => {
    setSearch(e.target.value);
    e.preventDefault();

    setFilteredParticipants(
      participants.filter((participant) =>
        (
          participant.first_name.toLowerCase() +
          participant.last_name.toLowerCase()
        ).includes(search)
      )
    );
  };

  const updateParticipants = () => {
    fetch(`/api/participants/?eventId=${event_id}`)
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data.participants);
        setFilteredParticipants(data.participants);
      });
  };

  const endEvent = async (e) => {
    e.preventDefault();

    await fetch(`/api/events/${event_id}/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setError(data.message);

        if (!data.message) {
          setEvent({
            id: event_id,
            name: event.name,
            start_date: event.start_date,
            format: event.format,
            notes: event.notes,
            semester_id: event.semester_id,
            state: 1,
          });
        }
      });
  };

  useEffect(() => {
    const requests = [];

    requests.push(fetch(`/api/events/${event_id}`).then((res) => res.json()));
    requests.push(
      fetch(`/api/participants/?eventId=${event_id}`).then((res) => res.json())
    );

    Promise.all(requests).then(([eventData, participantsData]) => {
      setEvent(eventData.event);
      setParticipants(participantsData.participants);
      setFilteredParticipants(participantsData.participants);
      setIsLoading(false);
    });
  }, [event_id]);

  const EventTable = ({ participantsList }) => {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <strong>Registered Entries </strong>
          <span className="spaced faded">{participantsList.length}</span>
        </div>

        <div className="list-registered">
          <input
            type="text"
            placeholder="Find entry..."
            className="form-control search"
            value={search}
            onChange={searchParticipants}
          />
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Student Number</th>
                <th>Signed Out At</th>
                <th className="center">Place</th>
                <th className="center">Actions</th>
              </tr>
            </thead>

            <tbody className="list">
              {participantsList.map((participant, index) => (
                <Participant participant={participant} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const Participant = ({ participant, index }) => {
    const updateParticipant = async (e, user_id, action) => {
      e.preventDefault();

      await fetch(`/api/participants/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user_id,
          eventId: event_id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.message);

          if (!data.message) {
            updateParticipants();
          }
        });
    };

    const deleteParticipant = async (e, user_id) => {
      e.preventDefault();

      await fetch("/api/participants", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user_id,
          eventId: event_id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.message);

          if (!data.message) {
            updateParticipants();
          }
        });
    };

    return (
      <tr key={participant.id}>
        <th>{index + 1}</th>

        <td className="fname">{participant.first_name}</td>

        <td className="lname">{participant.last_name}</td>

        <td className="studentno">{participant.id}</td>

        <td className="signed_out_at">
          {participant.signed_out_at ? (
            <span>
              {participant.signed_out_at.toLocaleString("en-US", {
                hour12: true,
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          ) : (
            <i>Not Signed Out</i>
          )}
        </td>

        <td className="placement">
          <span className="margin-center">
            {participant.placement ? participant.placement : "--"}
          </span>
        </td>

        <td className="center">
          {event.state !== 1 && (
            <div className="btn-group">
              {participant.signed_out_at ? (
                <form
                  onSubmit={(e) =>
                    updateParticipant(e, participant.id, "sign-in")
                  }
                  className="form-inline"
                >
                  <button type="submit" className="btn btn-primary">
                    Sign Back In
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(e) =>
                    updateParticipant(e, participant.id, "sign-out")
                  }
                  className="form-inline"
                >
                  <button type="submit" className="btn btn-info">
                    Sign Out
                  </button>
                </form>
              )}
              <form
                onSubmit={(e) => deleteParticipant(e, participant.id)}
                className="form-inline"
              >
                <button type="submit" className="btn btn-warning">
                  Remove
                </button>
              </form>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <Switch>
      <Route exact path={path}>
        {!isLoading && (
          <div>
            {event.state === 1 && (
              <div className="alert alert-danger">This event has ended.</div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <h1>{event.name}</h1>
            <p>
              <strong>Format:</strong> {event.format}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {event.start_date.toLocaleString("en-US", {
                hour12: true,
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p>
              <strong>Additional Details:</strong> {event.notes}
            </p>

            {event.state !== 1 && (
              <div className="Button__group">
                <Link to={`${url}/sign-in`} className="btn btn-primary">
                  Register Members
                </Link>

                <form onSubmit={endEvent}>
                  <button type="submit" className="btn btn-danger">
                    End Event
                  </button>
                </form>
              </div>
            )}

            <EventTable participantsList={filteredParticipants} />
          </div>
        )}
      </Route>
      <Route exact path={`${path}/sign-in`}>
        <EventSignIn />
      </Route>
    </Switch>
  );
}
