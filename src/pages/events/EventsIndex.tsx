import React, { ReactElement, useEffect, useState } from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import "./Events.scss";
import EventShow from "./EventShow";
import EventCreate from "./EventCreate";

import TermSelector from "../../components/TermSelector/TermSelector";

export default function EventsIndex(): ReactElement {
  const { path, url } = useRouteMatch();

  const [isLoading, setIsLoading] = useState(true);
  const [semesters, setSemesters] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const viewEventsForSemester = (semesterId: string): void => {
    if (semesterId === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.semester_id === semesterId)
      );
    }
  };

  useEffect(() => {
    const requests = [];

    requests.push(fetch("/api/events").then((res) => res.json()));
    requests.push(fetch("/api/semesters").then((res) => res.json()));

    Promise.all(requests).then(([eventsData, semesterData]) => {
      setEvents(eventsData.events);
      setFilteredEvents(eventsData.events);
      setSemesters(semesterData.semesters);
      setIsLoading(false);
    });
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        {!isLoading && (
          <div>
            <h1>Events</h1>

            <div className="row">
              <div className="col-md-6">
                <Link
                  to={`${url}/create`}
                  className="btn btn-primary btn-responsive"
                >
                  Create an Event
                </Link>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <TermSelector
                    semesters={semesters}
                    onSelect={viewEventsForSemester}
                  />
                </div>
              </div>
            </div>

            <div className="list-group">
              {filteredEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`${url}/${event.id}`}
                  className="list-group-item"
                >
                  <h4 className="list-group-item-heading bold">{event.name}</h4>

                  <div className="list-group-item-text">
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
                    <p> {event.count || "No"} Entries </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Route>
      <Route exact path={`${path}/create`}>
        <EventCreate />
      </Route>
      <Route path={`${path}/:eventId`}>
        <EventShow />
      </Route>
    </Switch>
  );
}
