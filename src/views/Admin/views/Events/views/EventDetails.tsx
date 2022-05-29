import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Entry,
  Event,
  GetEventResponse,
  ListEntriesForEvent,
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
          participant.first_name.toLowerCase() +
          " " +
          participant.last_name.toLowerCase()
        ).includes(query.toLocaleLowerCase())
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

  const endEvent = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await fetch(`/api/events/${eventId}/end`, {
      method: "POST",
    }).then((res) => {
      if (res.status === 200) {
        return;
      }

      res.json().then((data) => {
        setError(data.message);

        if (!data.message && event && eventId) {
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
    });
  };

  useEffect(() => {
    const requests = [];

    requests.push(
      fetch(`/api/events/${eventId}`).then(
        (res) => res.json() as Promise<GetEventResponse>
      )
    );
    requests.push(
      fetch(`/api/participants?eventId=${eventId}`).then(
        (res) => res.json() as Promise<ListEntriesForEvent>
      )
    );

    Promise.all(requests).then(([eventData, participantsData]) => {
      setEvent({
        id: (eventData as GetEventResponse).event.id,
        name: (eventData as GetEventResponse).event.name,
        format: (eventData as GetEventResponse).event.format,
        notes: (eventData as GetEventResponse).event.notes,
        semester_id: (eventData as GetEventResponse).event.semester_id,
        start_date: new Date((eventData as GetEventResponse).event.start_date),
        state: (eventData as GetEventResponse).event.state,
      });
      setParticipants(
        (participantsData as ListEntriesForEvent).participants.map(
          (p: Entry) => ({
            ...p,
            signed_out_at:
              p.signed_out_at !== undefined && p.signed_out_at !== null
                ? new Date(p.signed_out_at)
                : undefined,
          })
        )
      );
      setFilteredParticipants(
        (participantsData as ListEntriesForEvent).participants.map(
          (p: Entry) => ({
            ...p,
            signed_out_at:
              p.signed_out_at !== undefined && p.signed_out_at
                ? new Date(p.signed_out_at)
                : undefined,
          })
        )
      );
      setIsLoading(false);
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
