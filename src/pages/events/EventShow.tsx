import React, { FormEvent, ReactElement, useEffect, useState } from "react";

import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { Entry, Event } from "../../types";
import EntriesTable from "./EntriesTable";

import "./Events.scss";

import EventSignIn from "./EventSignIn";

export default function EventShow(): ReactElement {
  const { path, url } = useRouteMatch();
  const { eventId } = useParams<{ eventId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event>();
  const [participants, setParticipants] = useState<Entry[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Entry[]>([]);

  const [error, setError] = useState("");

  const searchParticipants = (query: string) => {
    setFilteredParticipants(
      participants.filter((participant) =>
        (
          participant.first_name.toLowerCase() +
          participant.last_name.toLowerCase()
        ).includes(query)
      )
    );
  };

  const updateParticipants = (): void => {
    fetch(`/api/participants/?eventId=${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data.participants);
        setFilteredParticipants(data.participants);
      });
  };

  const endEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    await fetch(`/api/events/${eventId}/end`, {
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
            id: eventId,
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

    requests.push(fetch(`/api/events/${eventId}`).then((res) => res.json()));
    requests.push(
      fetch(`/api/participants?eventId=${eventId}`).then((res) => res.json())
    );

    Promise.all(requests).then(
      ([eventData, participantsData]: [
        { event: Event },
        { participants: Entry[] }
      ]) => {
        setEvent({
          id: eventData.event.id,
          name: eventData.event.name,
          format: eventData.event.format,
          notes: eventData.event.notes,
          semester_id: eventData.event.semester_id,
          start_date: new Date(eventData.event.start_date),
          state: eventData.event.state,
        });
        setParticipants(
          participantsData.participants.map((p: Entry) => ({
            ...p,
            signed_out_at:
              p.signed_out_at !== null ? new Date(p.signed_out_at) : null,
          }))
        );
        setFilteredParticipants(
          participantsData.participants.map((p: Entry) => ({
            ...p,
            signed_out_at:
              p.signed_out_at !== null ? new Date(p.signed_out_at) : null,
          }))
        );
        setIsLoading(false);
      }
    );
  }, [eventId]);

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

            <EntriesTable
              entries={filteredParticipants}
              event={event}
              onSearch={searchParticipants}
              updateParticipants={updateParticipants}
              setError={setError}
            />
          </div>
        )}
      </Route>
      <Route exact path={`${path}/sign-in`}>
        <EventSignIn />
      </Route>
    </Switch>
  );
}
