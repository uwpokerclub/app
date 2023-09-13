import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import { Semester } from "../../../../../types";

function SemestersTable({
  semesters,
}: {
  semesters: Semester[];
}): ReactElement {
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
            <tr key={semester.id}>
              <td>{semester.name}</td>

              <td>
                {new Date(semester.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td>
                {new Date(semester.endDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td>
                <Link to={`${semester.id}`} className="btn btn-primary">
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

export default SemestersTable;
