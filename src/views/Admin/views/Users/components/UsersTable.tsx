import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import { User } from "../../../../../types";

function UsersTable({ users }: { users: User[] }): ReactElement {
  return (
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
          {users.map((u) => (
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
  );
}

export default UsersTable;
