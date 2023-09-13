import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";

import { Semester } from "../../../../../types";

import SemestersTable from "../components/SemestersTable";

function SemestersList(): ReactElement {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const { data } = useFetch<Semester[]>("semesters");

  useEffect(() => {
    if (data) {
      setSemesters(
        data.map((s) => ({
          ...s,
          startDate: new Date(s.startDate),
          endDate: new Date(s.endDate),
        })),
      );
    }
  }, [data]);

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
