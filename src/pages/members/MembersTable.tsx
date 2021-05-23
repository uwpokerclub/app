import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import { User } from "../../types";

export interface Props {
  url: string;
  members: User[];
}

export default function MembersTable({ url, members }: Props): ReactElement {
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
          {members.map((m) => (
            <tr key={m.id}>
              <td className="studentno">
                <Link to={`${url}/${m.id}`}>{m.id}</Link>
              </td>
              <td className="fname">{m.first_name}</td>
              <td className="lname">{m.last_name}</td>
              <td className="email">{m.email}</td>
              <td className="questid">{m.quest_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
