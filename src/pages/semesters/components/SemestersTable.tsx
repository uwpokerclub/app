import React, { ReactElement } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Semester } from "../../../types";

export interface Props {
  semesters: Semester[];
}

export default function SemestersTable({ semesters }: Props): ReactElement {
  const { url } = useRouteMatch();

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {semesters.map((semester) => (
            <tr>
              <td>{semester.name}</td>

              <td>
                {semester.start_date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td>
                {semester.end_date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td>
                <Link to={`${url}/${semester.id}`} className="btn btn-primary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
