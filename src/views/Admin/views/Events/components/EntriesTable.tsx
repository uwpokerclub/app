import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Entry, Event } from "../../../../../types";

function EntriesTable({
  entries,
  event,
  onSearch,
  updateParticipants,
  setError,
}: {
  entries: Entry[];
  event: Event;
  onSearch(query: string): void;
  updateParticipants(): void;
  setError: Dispatch<SetStateAction<string>>;
}): ReactElement {
  const [search, setSearch] = useState("");

  const updateParticipant = (membershipId: string, action: string) => {
    fetch(`/api/participants/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        membershipId,
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

  const deleteParticipant = async (membershipId: string) => {
    await fetch("/api/participants", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        membershipId,
        eventId: event.id,
      }),
    }).then((response) => {
        if (response.status !== 204) {
          response.json().then((data) => {
            setError(data.message);
          });  
        } else {
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
              <th>Rebuys</th>
              <th>Signed Out At</th>
              <th className="center">Place</th>
              <th className="center">Actions</th>
            </tr>
          </thead>

          <tbody className="list">
            {entries.map((entry, index) => (
              <tr key={entry.id}>
                <th>{index + 1}</th>

                <td className="fname">{entry.firstName}</td>

                <td className="lname">{entry.lastName}</td>

                <td className="studentno">{entry.id}</td>

                <td className="rebuys">{entry.rebuys}</td>

                <td className="signed_out_at">
                  {entry.signedOutAt !== null ? (
                    <span>
                      {new Date(entry.signedOutAt).toLocaleString("en-US", {
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

                <td className="center placement">
                  <span className="margin-center">
                    {entry.placement ? entry.placement : "--"}
                  </span>
                </td>

                <td className="center">
                  {event.state !== 1 && (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => updateParticipant(entry.membershipId, "rebuy")}>
                        Rebuy
                      </button>
                      {entry.signedOutAt ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() =>
                            updateParticipant(entry.membershipId, "sign-in")
                          }
                        >
                          Sign Back In
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-info"
                          onClick={() =>
                            updateParticipant(entry.membershipId, "sign-out")
                          }
                        >
                          Sign Out
                        </button>
                      )}
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={() => deleteParticipant(entry.membershipId)}
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

export default EntriesTable;