import { useMemo, useState } from "react";
import { useFetch } from "../../../hooks";
import { User } from "../../../types";
import { Link } from "react-router-dom";

export function ListUsers() {
  const { data: users } = useFetch<User[]>("users");

  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(
    () =>
      users?.filter((user) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase())) || [],
    [query, users],
  );

  return (
    <div>
      <h1>Users ({filteredUsers.length})</h1>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <Link to={`new`} className="btn btn-primary btn-responsive">
            Add Members
          </Link>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="input-group">
            <span className="input-group-btn">
              <button type="button" className="btn btn-default">
                Search
              </button>
            </span>

            <input
              type="text"
              placeholder="Search..."
              className="form-control search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th data-sort="studentno" className="sort">
                Student Number
              </th>
              <th data-sort="fname" className="sort">
                First Name
              </th>
              <th data-sort="lname" className="sort">
                Last Name
              </th>
              <th data-sort="email" className="sort">
                Email
              </th>
              <th data-sort="questid" className="sort">
                Quest ID
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td className="studentno">
                  <Link to={`${u.id}`}>{u.id}</Link>
                </td>
                <td className="fname">{u.firstName}</td>
                <td className="lname">{u.lastName}</td>
                <td className="email">{u.email}</td>
                <td className="questid">{u.questId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
