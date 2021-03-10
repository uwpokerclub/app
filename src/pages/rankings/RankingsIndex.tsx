import React, { ReactElement, useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import { Semester } from "../../types";

import SemesterRankings from "./SemesterRankings";

export default function RankingsIndex(): ReactElement {
  const { path, url } = useRouteMatch();

  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    fetch("/api/semesters")
      .then((res) => res.json())
      .then((data) => setSemesters(data.semesters));
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <div>
          <h1>Rankings</h1>
          <div className="list-group">
            {semesters.map((semester) => (
              <Link key={semester.id} to={`${url}/${semester.id}`} className="list-group-item">
                <h4 className="list-group-item-heading bold">{semester.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      </Route>

      <Route path={`${path}/:semesterId`}>
        <SemesterRankings />
      </Route>
    </Switch>
  );
}
