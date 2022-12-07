import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Semester } from "../../../../../types";

import SemestersTable from "../components/SemestersTable";

function SemestersList(): ReactElement {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    fetch("/api/semesters")
      .then((res) => res.json())
      .then((data) =>
        setSemesters(
          data.map((s: Semester) => ({
            ...s,
            start_date: new Date(s.startDate),
            end_date: new Date(s.endDate),
          }))
        )
      );
  }, []);

  return (
    <div>
      <h1>Semesters</h1>
      <Link to={`new`} className="btn btn-primary btn-responsive">
        Create a Semester
      </Link>
      <SemestersTable semesters={semesters} />
    </div>
  );
}

export default SemestersList;
