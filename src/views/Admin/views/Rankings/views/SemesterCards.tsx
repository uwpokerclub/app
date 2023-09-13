import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";

import { Semester } from "../../../../../types";

function SemesterCards(): ReactElement {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const { data } = useFetch<Semester[]>("/semesters");

  useEffect(() => {
    if (data) {
      setSemesters(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Rankings</h1>
      <div className="list-group">
        {semesters.map((semester) => (
          <Link
            key={semester.id}
            to={`${semester.id}`}
            className="list-group-item"
          >
            <h4 className="list-group-item-heading bold">{semester.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SemesterCards;
