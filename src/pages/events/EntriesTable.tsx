import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";

import { Entry, Event } from "../../types";

interface Props {
  entries: Entry[];
  event: Event;
  onSearch(query: string): void;
  updateParticipants(): void;
  setError: Dispatch<SetStateAction<string>>;
}

export default function EntriesTable({
  entries,
  event,
  onSearch,
  updateParticipants,
  setError,
}: Props): ReactElement {
  const [search, setSearch] = useState("");

  const updateParticipant = async (userId: string, action: string) => {
    await fetch(`/api/participants/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        eventId: event.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setError(data.message);

        if (!data.message) {
          updateParticipants();
        }
      });
  };

  const deleteParticipant = async (userId: string) => {
    await fetch("/api/participants", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        eventId: event.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setError(data.message);

        if (!data.message) {
          updateParticipants();
        }
      });
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <strong>Registered Entries </strong>
        <span className="spaced faded">{entries.length}</span>
      </div>

      <div className="list-registered">
        <input
          type="text"
          placeholder="Find entry..."
          className="form-control search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Student Number</th>
              <th>Signed Out At</th>
              <th className="center">Place</th>
              <th className="center">Actions</th>
            </tr>
          </thead>

          <tbody className="list">
            {entries.map((entry, index) => (
              <tr key={entry.id}>
                <th>{index + 1}</th>

                <td className="fname">{entry.first_name}</td>

                <td className="lname">{entry.last_name}</td>

                <td className="studentno">{entry.id}</td>

                <td className="signed_out_at">
                  {entry.signed_out_at ? (
                    <span>
                      {entry.signed_out_at.toLocaleString("en-US", {
                        hour12: true,
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  ) : (
                    <i>Not Signed Out</i>
                  )}
                </td>

                <td className="placement">
                  <span className="margin-center">
                    {entry.placement ? entry.placement : "--"}
                  </span>
                </td>

                <td className="center">
                  {event.state !== 1 && (
                    <div className="btn-group">
                      {entry.signed_out_at ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => updateParticipant(entry.id, "sign-in")}
                        >
                          Sign Back In
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-info"
                          onClick={() =>
                            updateParticipant(entry.id, "sign-out")
                          }
                        >
                          Sign Out
                        </button>
                      )}
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={() => deleteParticipant(entry.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
