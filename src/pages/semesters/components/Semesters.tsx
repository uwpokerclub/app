import React, { ReactElement, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Semester } from "../../../types";

import SemestersTable from "./SemestersTable";

export default function Semesters(): ReactElement {
  const { url } = useRouteMatch();
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    fetch("/api/semesters")
      .then((res) => res.json())
      .then((data) =>
        setSemesters(
          data.semesters.map((s: Semester) => ({
            ...s,
            start_date: new Date(s.start_date),
            end_date: new Date(s.end_date),
          }))
        )
      );
  }, []);

  return (
    <div>
      <h1>Semesters</h1>
      <Link to={`${url}/create`} className="btn btn-primary btn-responsive">
        Create a Semester
      </Link>
      <SemestersTable semesters={semesters} />
    </div>
  );
}
