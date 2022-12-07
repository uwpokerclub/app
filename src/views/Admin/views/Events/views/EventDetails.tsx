import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Entry,
  Event,
} from "../../../../../types";
import EntriesTable from "../components/EntriesTable";

function EventDetails(): ReactElement {
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
          participant.firstName.toLowerCase() +
          " " +
          participant.lastName.toLowerCase()
        ).includes(query.toLocaleLowerCase())
      )
    );
  };

  const updateParticipants = (): void => {
    fetch(`/api/participants/?eventId=${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data);
        setFilteredParticipants(data);
      });
  };

  const endEvent = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await fetch(`/api/events/${eventId}/end`, {
      method: "POST",
    }).then((res) => {
      if (res.status === 204) {
        if (!eventId || !event) {
          return
        }

        setEvent({
          id: eventId,
          name: event.name,
          startDate: event.startDate,
          format: event.format,
          notes: event.notes,
          semesterId: event.semesterId,
          state: 1,
        });

        updateParticipants()
      } else {
        res.json().then((data) => {
          setError(data.message);
        });
      }
    });
  };

  useEffect(() => {
    const requests = [];

    requests.push(
      fetch(`/api/events/${eventId}`).then(
        (res) => res.json() as Promise<Event>
      )
    );
    requests.push(
      fetch(`/api/participants?eventId=${eventId}`).then(
        (res) => res.json() as Promise<Entry[]>
      )
    );

    Promise.all(requests).then(([event, participants]) => {
      setEvent({
        id: (event as Event).id,
        name: (event as Event).name,
        format: (event as Event).format,
        notes: (event as Event).notes,
        semesterId: (event as Event).semesterId,
        startDate: new Date((event as Event).startDate),
        state: (event as Event).state,
      });
      setParticipants(
        (participants as Entry[]).map(
          (p: Entry) => ({
            ...p,
            signed_out_at:
              p.signedOutAt !== undefined && p.signedOutAt !== null
                ? new Date(p.signedOutAt)
                : undefined,
          })
        )
      );
      setFilteredParticipants(
        (participants as Entry[]).map(
          (p: Entry) => ({
            ...p,
            signed_out_at:
              p.signedOutAt !== undefined && p.signedOutAt
                ? new Date(p.signedOutAt)
                : undefined,
          })
        )
      );
      setIsLoading(false);

      console.log(participants)
    });
  }, [eventId]);

  return (
    <>
      {event !== undefined && !isLoading && (
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
            {event.startDate.toLocaleString("en-US", {
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
              <Link to={`register`} className="btn btn-primary">
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
    </>
  );
}

export default EventDetails;
