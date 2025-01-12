import { FormEvent, useCallback, useState } from "react";
import { Event } from "../../../sdk/events";
import { sendRequest } from "../../../lib";
import { useNavigate } from "react-router-dom";

import styles from "./EditEventForm.module.css";

type EditEventFormProps = {
  event: Event;
};

export function EditEventForm({ event }: EditEventFormProps) {
  const navigate = useNavigate();

  const [name, setName] = useState(event.name);
  const [startDate, setStartDate] = useState(event.startDate);
  const [format, setFormat] = useState(event.format);
  const [notes, setNotes] = useState(event.notes);
  const [pointsMultiplier, setPointsMultiplier] = useState(`${event.pointsMultiplier}`);

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const formatLocalDateTime = useCallback((date: Date) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }, []);

  const submitDisabled = useCallback(
    () =>
      name === "" ||
      format === "Select a format" ||
      pointsMultiplier === "" ||
      Number.isNaN(Number(pointsMultiplier)) ||
      Number(pointsMultiplier) < 0,
    [format, name, pointsMultiplier],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setPending(true);
      try {
        await sendRequest(`events/${event.id}`, "PATCH", true, {
          name,
          startDate,
          format,
          notes,
          pointsMultiplier: Number(pointsMultiplier),
        });

        navigate("../");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setPending(false);
      }
    },
    [event.id, format, name, navigate, notes, pointsMultiplier, startDate],
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          data-qa="input-name"
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="semesterId">Term</label>
        <input
          data-qa="input-semester-id"
          name="semesterId"
          type="text"
          className="form-control"
          value={event.semester.name}
          disabled
        />
      </div>

      <div className="mb-3">
        <label htmlFor="startDate">Date</label>
        <input
          data-qa="input-date"
          type="datetime-local"
          name="startDate"
          className="form-control"
          value={formatLocalDateTime(startDate)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="format">Format</label>
        <select
          data-qa="select-format"
          name="format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="form-control"
        >
          <option disabled value="Invalid">
            Select a format
          </option>
          <option value="No Limit Hold'em">No Limit Hold&apos;em</option>
          <option value="Pot Limit Omaha">Pot Limit Omaha</option>
          <option value="Short Deck No Limit Hold'em">Short Deck No Limit Hold&apos;em</option>
          <option value="Dealers Choice">Dealers Choice</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="pointsMultiplier">Points Multiplier</label>
        <input
          data-qa="input-points-multiplier"
          name="pointsMultiplier"
          className="form-control"
          type="text"
          value={pointsMultiplier}
          onChange={(e) => setPointsMultiplier(e.target.value)}
        ></input>
      </div>

      <div className="mb-3">
        <label htmlFor="structure">Structure</label>
        <input
          data-qa="input-structure"
          name="structure"
          className="form-control"
          type="text"
          value={event.structure.name}
          disabled
        />
      </div>

      <div className="mb-3">
        <label htmlFor="notes">Additional Details</label>
        <textarea
          data-qa="input-additional-details"
          rows={6}
          name="notes"
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="row">
        <div className="text-center">
          <button
            data-qa="submit-btn"
            type="submit"
            value="create"
            className="btn btn-success btn-responsive"
            disabled={pending || submitDisabled()}
          >
            {pending ? (
              /* !Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */
              <span>
                <svg
                  className={styles.spinner}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16px"
                  height="16px"
                >
                  <path
                    fill="#FFFFFF"
                    d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
                  />
                </svg>
              </span>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
