import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";

import { APIErrorResponse, Entry, Event } from "../../../../../types";
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
        ).includes(query.toLocaleLowerCase()),
      ),
    );
  };

  const updateParticipants = (): void => {
    sendAPIRequest<Entry[]>(`participants?eventId=${eventId}`).then(
      ({ data }) => {
        if (data) {
          setParticipants(data);
          setFilteredParticipants(data);
        }
      },
    );
  };

  const endEvent = (e: React.FormEvent): void => {
    e.preventDefault();

    sendAPIRequest<APIErrorResponse>(`events/${eventId}/end`, "POST").then(
      ({ status, data }) => {
        if (data && status !== 204) {
          setError(data.message);
        } else {
          if (!eventId || !event) {
            return;
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

          updateParticipants();
        }
      },
    );
  };

  const { data: eventData } = useFetch<Event>(`events/${eventId}`);
  const { data: entries } = useFetch<Entry[]>(
    `participants?eventId=${eventId}`,
  );

  useEffect(() => {
    if (eventData) {
      setEvent({
        id: eventData.id,
        name: eventData.name,
        format: eventData.format,
        notes: eventData.notes,
        semesterId: eventData.semesterId,
        startDate: new Date(eventData.startDate),
        state: eventData.state,
      });
    }

    if (entries) {
      setParticipants(
        entries.map((p: Entry) => ({
          ...p,
          signed_out_at:
            p.signedOutAt !== undefined && p.signedOutAt !== null
              ? new Date(p.signedOutAt)
              : undefined,
        })),
      );

      setFilteredParticipants(
        entries.map((p: Entry) => ({
          ...p,
          signed_out_at:
            p.signedOutAt !== undefined && p.signedOutAt
              ? new Date(p.signedOutAt)
              : undefined,
        })),
      );
    }

    setIsLoading(false);
  }, [eventId, entries, eventData]);

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
            {new Date(event.startDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
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
