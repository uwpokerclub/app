import { useState } from "react";
import { Entry, Event } from "../../../types";
import { sendAPIRequest } from "../../../lib";

type EntriesTableProps = {
  entries: Entry[];
  event: Event;
  updateParticipants: () => void;
};

export function EntriesTable({ entries, event, updateParticipants }: EntriesTableProps) {
  const [query, setQuery] = useState("");

  const updateParticipant = async (membershipId: string, action: string) => {
    const { status } = await sendAPIRequest(`participants/${action}`, "POST", {
      membershipId,
      eventId: event.id,
    });

    if (status === 200) {
      updateParticipants();
    }
  };

  const deleteParticipant = async (membershipId: string) => {
    const { status } = await sendAPIRequest("participants", "DELETE", {
      membershipId,
      eventId: event.id,
    });

    if (status === 204) {
      updateParticipants();
    }
  };

  const filteredEntries = entries.filter((e) =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <strong>{entries.length + event.rebuys} Entries </strong>
        <span className="spaced faded">
          ({entries.length} Players, {event.rebuys} Rebuys)
        </span>
      </div>

      <div className="list-registered">
        <input
          type="text"
          placeholder="Find entry..."
          className="form-control search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Student Number</th>
              <th>Signed Out At</th>
              <th className="text-center">Place</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="list">
            {filteredEntries.map((entry, index) => (
              <tr key={entry.id}>
                <th>{index + 1}</th>

                <td className="fname">{entry.firstName}</td>

                <td className="lname">{entry.lastName}</td>

                <td className="studentno">{entry.id}</td>

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
                  <span className="margin-center">{entry.placement ? entry.placement : "--"}</span>
                </td>

                <td className="center">
                  {event.state !== 1 && (
                    <div className="btn-group">
                      {entry.signedOutAt ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => updateParticipant(entry.membershipId, "sign-in")}
                        >
                          Sign Back In
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-info"
                          onClick={() => updateParticipant(entry.membershipId, "sign-out")}
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
