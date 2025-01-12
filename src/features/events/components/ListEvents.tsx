import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../../../hooks";
import { Semester, Event } from "../../../types";

import styles from "./ListEvent.module.css";

export function ListEvents() {
  const { data: events, isLoading } = useFetch<Event[]>("events");
  const { data: semesters } = useFetch<Semester[]>("semesters");

  const [semesterId, setSemesterId] = useState("");

  const filteredEvents = events?.filter((event) => (semesterId !== "" ? event.semesterId === semesterId : true)) || [];

  return (
    <>
      {!isLoading && (
        <div>
          <h1>Events</h1>

          <div className="row">
            <div className="col-md-6">
              <Link data-qa="create-event-btn" to="new" className="btn btn-primary btn-responsive">
                Create an Event
              </Link>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                {semesters && (
                  <select className="form-control" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
                    <option value="">All</option>
                    {semesters.map((semester) => (
                      <option key={semester.id} value={semester.id}>
                        {semester.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="list-group">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                to={`${event.id}`}
                className={`${styles.card} list-group-item d-flex justify-content-between`}
                data-qa={`event-${event.id}-card`}
              >
                <div>
                  <h4 data-qa={`${event.id}-name`} className="list-group-item-heading bold">
                    {event.name}
                  </h4>

                  <div className="list-group-item-text">
                    <p data-qa={`${event.id}-format`}>
                      <strong>Format:</strong> {event.format}
                    </p>
                    <p data-qa={`${event.id}-date`}>
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
                    <p data-qa={`${event.id}-additional-details`}>
                      <strong>Additional Details:</strong> {event.notes}
                    </p>
                    <p> {event.count || "No"} Entries </p>
                  </div>
                </div>
                <div data-qa="actions" className={`${styles.actions} d-flex align-items-center me-4`}>
                  <Link data-qa="edit-event-btn" to={`${event.id}/edit`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                      />
                    </svg>
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
