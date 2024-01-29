import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Semester } from "../../../types";

export function SemesterList() {
  const { data: semesters } = useFetch<Semester[]>("semesters");

  return (
    <div>
      <h1>Rankings</h1>
      <div className="list-group">
        {semesters?.map((semester) => (
          <Link key={semester.id} to={`${semester.id}`} className="list-group-item">
            <h4 className="list-group-item-heading bold">{semester.name}</h4>
          </Link>
        )) || <></>}
      </div>
    </div>
  );
}
