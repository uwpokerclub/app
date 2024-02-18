import { Link } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Semester } from "../../../types";

export function SemestersList() {
  const { data: semesters } = useFetch<Semester[]>("semesters");

  // TODO: Need design for case where there are no semesters / error returned by API
  if (!semesters) {
    return <></>;
  }

  return (
    <div>
      <h1>Semesters</h1>
      <Link to="new" className="btn btn-primary btn-responsive">
        Create a Semester
      </Link>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester) => (
              <tr key={semester.id}>
                <td>{semester.name}</td>

                <td>
                  {new Date(semester.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td>
                  {new Date(semester.endDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td>
                  <Link to={`${semester.id}`} className="btn btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
