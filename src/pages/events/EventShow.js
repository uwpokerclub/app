import React from 'react'

import { Link, Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import "./Events.scss"

import EventSignIn from "./EventSignIn"

export default function EventShow() {
  const { path, url } = useRouteMatch()
  const { event_id } = useParams()
  const event = {
    "id": event_id,
    "name": `Event ${event_id}`,
    "format": "NLHE",
    "start_date": new Date("2020-02-01T19:00:00"),
    "notes": "First testing",
    "count": 3,
    "state": 0
  }
  const error = "";
  const participants = [
    {
      "id": 0,
      "first_name": "Bob",
      "last_name": "Johnson",
      "signed_out_at": new Date("2020-02-01T19:00:00"),
      "placement": "--",
      "event_id": 1
    },
    {
      "id": 1,
      "first_name": "Deep",
      "last_name": "Kalra",
      "signed_out_at": null,
      "placement": "--",
      "event_id": 1
    },
    {
      "id": 2,
      "first_name": "Adam",
      "last_name": "Mahood",
      "signed_out_at": new Date("2020-02-01T19:00:00"),
      "placement": "--",
      "event_id": 1
    },
    {
      "id": 3,
      "first_name": "Sasha",
      "last_name": "Nayar",
      "signed_out_at": null,
      "placement": "--",
      "event_id": 1
    },
    {
      "id": 4,
      "first_name": "Arham",
      "last_name": "Abidi",
      "signed_out_at": null,
      "placement": "--",
      "event_id": 1
    }
  ]

  return (
    <Switch>
      <Route exact path={path}>
        <div>
          {event.state === 1 &&
            <div className="alert alert-danger">This event has ended.</div>
          }

          {error &&
            <div className="alert alert-danger">error</div>
          }

          <h1>{event.name}</h1>
          <p><strong>Format:</strong> {event.format}</p>
          <p><strong>Date:</strong> {event.start_date.toLocaleString("en-US", { hour12: true, month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</p>
          <p><strong>Additional Details:</strong> {event.notes}</p>

          {event.state !== 1 &&
            <div className="Button__group">

              <Link to={`${url}/sign-in`} className="btn btn-primary">Register Members</Link>

              <form onSubmit={endEvent}>
                <input type="hidden" name="event_id" value={event_id} />
                <button type="submit" className="btn btn-danger">End Event</button>
              </form>

            </div>
          }

          <EventTable participants={participants} state={event.state} />

        </div>
      </Route>
      <Route exact path={`${path}/sign-in`}>
        <EventSignIn />
      </Route>
    </Switch>
  )
}

const EventTable = ({ participants, state }) => {
  return (
    <div className="panel panel-default">

      <div className="panel-heading">
        <strong>Registered Entries </strong>
        <span className="spaced faded">{participants.length}</span>
      </div>

      <div className="list-registered">
        <input type="text" placeholder="Find entry..." className="form-control search" />
        <table className="table">

          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                First Name
              </th>
              <th>
                Last Name
              </th>
              <th>
                Student Number
              </th>
              <th>
                Signed Out At
              </th>
              <th className="center">
                Place
              </th>
              <th className="center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="list">
            {participants.map((participant, index) => (
              <Participant participant={participant} index={index} state={state} />
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

const Participant = ({ participant, index, state }) => {
  return (
    <tr>

      <th>
        {index + 1}
      </th>

      <td className="fname">
        {participant.first_name}
      </td>

      <td className="lname">
        {participant.last_name}
      </td>

      <td className="studentno">
        {participant.id}
      </td>

      <td className="signed_out_at">
        {
          participant.signed_out_at 
          ? <span>{participant.signed_out_at.toLocaleString("en-US", { hour12: true, month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</span>
          : <i>Not Signed Out</i>
        }
      </td>

      <td className="placement">
        <span className="margin-center">
          {
            participant.placement 
            ? participant.placement 
            : "--"
          }
        </span>
      </td>

      <td className="center">
        {state !== 1 &&
          <div className="btn-group">
            {
              !participant.signed_out_at
              ?
                <form onSubmit={signOutParticipant} className="form-inline">

                  <div className="form-group">
                    <input type="hidden" name="user_id" value={participant.id} className="form-control" />
                  </div>

                  <div className="form-group">
                    <input type="hidden" name="event_id" value={participant.event_id} className="form-control" />
                  </div>

                  <button type="submit" className="btn btn-info">
                    Sign Out
                  </button>

                </form>
              :
                <form onSubmit={signBackInParticipant} className="form-inline">

                <div className="form-group">
                  <input type="hidden" name="user_id" value={participant.id} className="form-control" />
                </div>

                <div className="form-group">
                  <input type="hidden" name="event_id" value={participant.event_id} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">
                Sign Back In
                </button>

                </form>
            }
            <form onSubmit={removeParticipant} className="form-inline">

              <div className="form-group">
                <input type="hidden" name="user_id" value={participant.id} className="form-control" />
              </div>

              <div className="form-group">
                <input type="hidden" name="event_id" value={participant.event_id} className="form-control" />
              </div>

              <button type="submit" className="btn btn-warning">
                Remove
              </button>
              
            </form>
          </div>
        }
      </td>

    </tr>
  )
}

const signOutParticipant = (user_id, event_id) => {
  return ;
}

const signBackInParticipant = (user_id, event_id) => {
  return ;
}

const removeParticipant = (user_id, event_id) => {
  return ;
}

const endEvent = (event_id) => {
  return ;
}
