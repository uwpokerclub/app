import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { APIErrorResponse, Entry, Event, StructureWithBlinds } from "../../../types";
import { FormEvent, useEffect, useState } from "react";
import { sendAPIRequest } from "../../../lib";
import { EntriesTable } from "./EntriesTable";

import styles from "./EventDetails.module.css";
import { TournamentClock } from "./TournamentClock";

export function EventDetails() {
  const { eventId = "" } = useParams<{ eventId: string }>();

  const { data: event, setData: setEvent, isLoading } = useFetch<Event>(`events/${eventId}`);
  const { data: entries, setData: setEntries } = useFetch<Entry[]>(`participants?eventId=${eventId}`);

  const [structure, setStructure] = useState<StructureWithBlinds>();
  const [showInfo, setShowInfo] = useState(true);
  const [showEntries, setShowEntries] = useState(true);
  const [error, setError] = useState("");

  const updateParticipants = async () => {
    const { status, data } = await sendAPIRequest<Entry[]>(`participants?eventId=${eventId}`);

    if (status === 200 && data) {
      setEntries(data);
    }
  };

  const endEvent = async (e: FormEvent) => {
    e.preventDefault();

    const { status, data } = await sendAPIRequest<APIErrorResponse>(`events/${eventId}/end`, "POST");

    if (data && status !== 204) {
      return setError(data.message);
    }

    setEvent((prev) => (prev ? { ...prev, state: 1 } : prev));

    updateParticipants();
  };

  const restartEvent = async (e: FormEvent) => {
    e.preventDefault();

    const { status, data } = await sendAPIRequest<APIErrorResponse>(`events/${eventId}/unend`, "POST");

    if (data && status !== 204) {
      return setError(data.message);
    }

    setEvent((prev) => (prev ? { ...prev, state: 0 } : prev));

    updateParticipants();
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

  useEffect(() => {
    if (!event) {
      return;
    }

    sendAPIRequest<StructureWithBlinds>(`structures/${event.structureId}`).then(({ data }) => {
      if (!data) {
        return;
      }
      setStructure(data);
    });
  }, [event]);

  return (
    <>
      {event !== undefined && !isLoading && (
        <div>
          {event.state === 1 && <div className="alert alert-danger">This event has ended.</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <section className={styles.tabGroup}>
            <div onClick={() => setShowInfo(true)} className={`${styles.tab} ${showInfo ? styles.tabActive : ""}`}>
              Tournament Info
            </div>
            <div onClick={() => setShowInfo(false)} className={`${styles.tab} ${!showInfo ? styles.tabActive : ""}`}>
              Clock
            </div>
          </section>
          {showInfo ? (
            <>
              <header className={styles.header}>
                <section className={styles.info}>
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
                <section className={styles.actions}>
                  {event.state !== 1 && (
                    <>
                      <Link to={`register`} className="btn btn-primary">
                        Register Members
                      </Link>

                      <button onClick={handleRebuy} type="button" className="btn btn-success">
                        Rebuy
                      </button>

                      <button onClick={endEvent} type="button" className="btn btn-danger">
                        End Event
                      </button>
                    </>
                  )}
                  {event.state === 1 && (
                    <>
                      <button onClick={restartEvent} type="button" className="btn btn-danger">
                        Restart Event
                      </button>
                    </>
                  )}
                </section>
              </header>

              <section className={styles.tabGroup}>
                <div
                  onClick={() => setShowEntries(true)}
                  className={`${styles.tab} ${showEntries ? styles.tabActive : ""}`}
                >
                  Entries
                </div>
                <div
                  onClick={() => setShowEntries(false)}
                  className={`${styles.tab} ${!showEntries ? styles.tabActive : ""}`}
                >
                  Structure
                </div>
              </section>

              {showEntries ? (
                <EntriesTable entries={entries || []} event={event} updateParticipants={updateParticipants} />
              ) : (
                <>
                  <input
                    name="structureName"
                    className="form-control"
                    placeholder="Name the structure"
                    value={structure?.name || "Unknown Structure"}
                    disabled
                  />
                  <header className={styles.blindsHeader}>
                    <span>Small</span>
                    <span>Big</span>
                    <span>Ante</span>
                    <span>Time</span>
                  </header>
                  {structure?.blinds.map((blind, i) => (
                    <div key={i} className="input-group">
                      <input className="form-control" type="text" value={blind.small} disabled></input>
                      <input className="form-control" type="text" value={blind.big} disabled></input>
                      <input className="form-control" type="text" value={blind.ante} disabled></input>
                      <input className="form-control" type="text" value={blind.time} disabled></input>
                    </div>
                  )) || <></>}
                </>
              )}
            </>
          ) : (
            <TournamentClock levels={structure?.blinds || []} />
          )}
        </div>
      )}
    </>
  );
}
