import React, { ReactElement } from "react";
import { Semester } from "../../types";

export interface Props {
  semesters: Semester[];
}

export default function SemestersTable({ semesters }: Props): ReactElement {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>

            <th>Start Date</th>

            <th>End Date</th>
          </tr>
        </thead>

        <tbody>
          {semesters.map((semester) => (
            <tr>
              <td>{semester.name}</td>

              <td>
                {semester.start_date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </td>

              <td>
                {semester.end_date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
