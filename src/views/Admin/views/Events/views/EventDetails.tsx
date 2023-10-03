import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";

import {
  APIErrorResponse,
  Entry,
  Event,
  StructureWithBlinds,
} from "../../../../../types";
import EntriesTable from "../components/EntriesTable";

import "./EventDetails.scss";
import { TournamentClock } from "../../../../../shared/components";

function EventDetails(): ReactElement {
  const { eventId } = useParams<{ eventId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event>();
  const [participants, setParticipants] = useState<Entry[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Entry[]>([]);
  const [showInfo, setShowInfo] = useState(true);
  const [showEntries, setShowEntries] = useState(true);
  const [structure, setStructure] = useState<StructureWithBlinds>({
    id: -1,
    name: "",
    blinds: [],
  });

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
            rebuys: event.rebuys,
            pointsMultiplier: event.pointsMultiplier,
            structureId: event.structureId,
          });

          updateParticipants();
        }
      },
    );
  };

  const handleRebuy = async () => {
    const { status } = await sendAPIRequest(`events/${eventId}/rebuy`, "POST");
    if (status === 200) {
      setEvent((e) => {
        if (!e) return;

        return {
          ...e,
          rebuys: e.rebuys + 1,
        };
      });
    }
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
        rebuys: eventData.rebuys,
        pointsMultiplier: eventData.pointsMultiplier,
        structureId: eventData.structureId,
      });

      sendAPIRequest<StructureWithBlinds>(
        `structures/${eventData.structureId}`,
      ).then(({ data }) => {
        if (!data) {
          return;
        }
        setStructure(data);
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

          <section className="TabGroup">
            <div
              onClick={() => setShowInfo(true)}
              className={`Tab ${showInfo ? "Tab-active" : ""}`}
            >
              Tournament Info
            </div>
            <div
              onClick={() => setShowInfo(false)}
              className={`Tab ${!showInfo ? "Tab-active" : ""}`}
            >
              Clock
            </div>
          </section>
          {showInfo ? (
            <>
              <header className="EventDetails__header">
                <section className="EventDetails__info">
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
                  {event.notes && (
                    <p>
                      <strong>Additional Details:</strong> {event.notes}
                    </p>
                  )}
                </section>
                <section className="EventDetails__actions">
                  {event.state !== 1 && (
                    <>
                      <Link to={`register`} className="btn btn-primary">
                        Register Members
                      </Link>

                      <button
                        onClick={handleRebuy}
                        type="button"
                        className="btn btn-success"
                      >
                        Rebuy
                      </button>

                      <button
                        onClick={endEvent}
                        type="button"
                        className="btn btn-danger"
                      >
                        End Event
                      </button>
                    </>
                  )}
                </section>
              </header>

              <section className="TabGroup">
                <div
                  onClick={() => setShowEntries(true)}
                  className={`Tab ${showEntries ? "Tab-active" : ""}`}
                >
                  Entries
                </div>
                <div
                  onClick={() => setShowEntries(false)}
                  className={`Tab ${!showEntries ? "Tab-active" : ""}`}
                >
                  Structure
                </div>
              </section>

              {showEntries ? (
                <EntriesTable
                  entries={filteredParticipants}
                  event={event}
                  onSearch={searchParticipants}
                  updateParticipants={updateParticipants}
                  setError={setError}
                />
              ) : (
                <>
                  <input
                    name="structureName"
                    className="form-control"
                    placeholder="Name the structure"
                    value={structure.name}
                    disabled
                  />
                  <header className="StructureBlinds__header">
                    <span>Small</span>
                    <span>Big</span>
                    <span>Ante</span>
                    <span>Time</span>
                  </header>
                  {structure.blinds.map((blind, i) => (
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        value={blind.small}
                        disabled
                      ></input>
                      <input
                        className="form-control"
                        type="text"
                        value={blind.big}
                        disabled
                      ></input>
                      <input
                        className="form-control"
                        type="text"
                        value={blind.ante}
                        disabled
                      ></input>
                      <input
                        className="form-control"
                        type="text"
                        value={blind.time}
                        disabled
                      ></input>
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <TournamentClock levels={structure.blinds} />
          )}
        </div>
      )}
    </>
  );
}

export default EventDetails;
