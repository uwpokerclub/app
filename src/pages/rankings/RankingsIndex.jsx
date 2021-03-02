import React, { useEffect, useState } from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SemesterRankings from "./SemesterRankings";

export default function RankingsIndex() {
  const { path, url } = useRouteMatch();

  const [semesters, setSemesters] = useState([]);

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
              <SemesterItem key={semester.id} semester={semester} url={url} />
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

const SemesterItem = ({ semester, url }) => {
  return (
    <Link to={`${url}/${semester.id}`} className="list-group-item">
      <h4 className="list-group-item-heading bold">{semester.name}</h4>
    </Link>
  );
};
