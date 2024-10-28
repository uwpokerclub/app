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
          data-qa="input-search"
          type="text"
          placeholder="Find entry..."
          className="form-control search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="table-responsive">
          <table className="table table-hover">
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
                <tr data-qa={`entry-${entry.membershipId}`} key={entry.id}>
                  <th>{index + 1}</th>

                  <td data-qa={`first-name`} className="fname">
                    {entry.firstName}
                  </td>

                  <td data-qa={`last-name`} className="lname">
                    {entry.lastName}
                  </td>

                  <td data-qa={`student-num`} className="studentno">
                    {entry.id}
                  </td>

                  <td data-qa={`signed-out-at`} className="signed_out_at">
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

                  <td data-qa={`placement`} className="center placement">
                    <span className="margin-center">{entry.placement ? entry.placement : "--"}</span>
                  </td>

                  <td data-qa={`actions`} className="center">
                    {event.state !== 1 && (
                      <div className="btn-group">
                        {entry.signedOutAt ? (
                          <button
                            data-qa="sign-in-btn"
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => updateParticipant(entry.membershipId, "sign-in")}
                          >
                            Sign Back In
                          </button>
                        ) : (
                          <button
                            data-qa="sign-out-btn"
                            type="submit"
                            className="btn btn-info"
                            onClick={() => updateParticipant(entry.membershipId, "sign-out")}
                          >
                            Sign Out
                          </button>
                        )}
                        <button
                          data-qa="remove-btn"
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
    </div>
  );
}
