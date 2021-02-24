import React from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SemesterRankings from "./SemesterRankings";

export default function RankingsIndex() {
  const { path, url } = useRouteMatch();

  const semesters = [
    {
      "id": 0,
      "name": "Winter 2021"
    },
    {
      "id": 1,
      "name": "Spring 2021"
    },
    {
      "id": 2,
      "name": "Fall 2021"
    }
  ];

  return (
    <Switch>

      <Route exact path={path}>
        <div>
          <h1>
            Rankings
          </h1>
          <div className="list-group">
            {semesters.map((semester) => (
              <SemesterItem semester={semester} url={url} />
            ))}
          </div>
        </div>
      </Route>

      <Route path={`${path}/:semester_id`}>
        <SemesterRankings />
      </Route>

    </Switch>
  );
}

const SemesterItem = ({ semester, url }) => {
  return (
    <Link to={`${url}/${semester.id}`} className="list-group-item">
      <h4 className="list-group-item-heading bold">
        {semester.name}
      </h4>
    </Link>
  );
};
