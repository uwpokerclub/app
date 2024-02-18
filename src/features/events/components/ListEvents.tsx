import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Semester, Event } from "../../../types";
import { useState } from "react";

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
              <Link to="new" className="btn btn-primary btn-responsive">
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
              <Link key={event.id} to={`${event.id}`} className="list-group-item">
                <h4 className="list-group-item-heading bold">{event.name}</h4>

                <div className="list-group-item-text">
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
                  <p> {event.count || "No"} Entries </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
