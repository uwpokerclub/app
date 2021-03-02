import React from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import "./Events.scss";
import EventShow from "./EventShow";
import EventCreate from "./EventCreate";

import TermSelector from "../../components/TermSelector/TermSelector";

export default function EventsIndex() {
  const { path, url } = useRouteMatch();
  const semesters = ["Winter 2021", "Spring 2021", "Fall 2021"];
  const events = [
    {
      id: 1,
      name: "Event 1",
      format: "NLHE",
      start_date: new Date("2020-02-01T19:00:00"),
      notes: "First testing",
      count: 3,
    },
    {
      id: 2,
      name: "Event 2",
      format: "NLHE",
      start_date: new Date("2020-02-02T20:00:00"),
      notes: "Second testing",
      count: 0,
    },
  ];

  return (
    <Switch>
      <Route exact path={path}>
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
                <select
                  className="form-control"
                  id="term-view"
                  name="semester"
                  onchange={viewEventsForSemester}
                >
                  <TermSelector semesters={semesters} />
                </select>
              </div>
            </div>
          </div>

          <div className="list-group">
            {events.map((event) => (
              <Event event={event} url={url} />
            ))}
          </div>
        </div>
      </Route>
      <Route exact path={`${path}/create`}>
        <EventCreate />
      </Route>
      <Route path={`${path}/:event_id`}>
        <EventShow />
      </Route>
    </Switch>
  );
}

const Event = ({ event, url }) => {
  return (
    <Link to={`${url}/${event.id}`} className="list-group-item">
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
  );
};

const viewEventsForSemester = () => {
  return;
};
