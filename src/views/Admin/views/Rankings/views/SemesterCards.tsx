import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Semester } from "../../../../../types";

function SemesterCards(): ReactElement {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    fetch("/api/semesters")
      .then((res) => res.json())
      .then((data) => setSemesters(data));
  }, []);

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
            <h4 className="list-group-item-heading bold">
              {semester.name}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SemesterCards;