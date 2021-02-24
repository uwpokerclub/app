import React from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SemesterCreate from "./SemesterCreate";

export default function SemestersIndex() {
  const { path, url } = useRouteMatch();
  const semesters = [
    {
      "name": "Winter 2021",
      "start_date": new Date("2021-01-01T19:00:00"),
      "end_date": new Date("2021-04-01T19:00:00")
    },
    {
      "name": "Spring 2021",
      "start_date": new Date("2021-05-01T19:00:00"),
      "end_date": new Date("2021-08-01T19:00:00")
    },
    {
      "name": "Fall 2021",
      "start_date": new Date("2021-09-01T19:00:00"),
      "end_date": new Date("2021-12-01T19:00:00")
    }
  ];

  return (
    <Switch>

      <Route exact path={path}>
        <div>
          <h1>
            Semesters
          </h1>
          <Link to={`${url}/create`} className="btn btn-primary btn-responsive">
            Create a Semester
          </Link>
          <SemesterTable semesters={semesters} />
        </div>
      </Route>

      <Route exact path={`${path}/create`}>
        <SemesterCreate />
      </Route>

    </Switch>
  );
}

const SemesterTable = ({ semesters }) => {
  return (
    <div className="table-responsive">
      <table className="table">

        <thead>
          <tr>

            <th>
              Name
            </th>

            <th>
              Start Date
            </th>

            <th>
              End Date
            </th>

          </tr>
        </thead>

        <tbody>
          {semesters.map((semester) => (
            <tr>

              <td>
                {semester.name}
              </td>

              <td>
                {semester.start_date.toLocaleDateString("en-US", { dateStyle: "long" })}
              </td>

              <td>
                {semester.end_date.toLocaleDateString("en-US", { dateStyle: "long"})}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};
