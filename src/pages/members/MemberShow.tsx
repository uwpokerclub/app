import React, { ReactElement, useEffect, useState } from "react";
import {
  Route,
  Link,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Semester, User } from "../../types";

import MemberUpdate from "./MemberEdit";

export default function MemberShow(): ReactElement {
  const { path, url } = useRouteMatch();
  const { memberId } = useParams<{ memberId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState<User>(null);
  const [semester, setSemester] = useState<Semester>(null);

  useEffect(() => {
    fetch(`/api/users/${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        setMember({
          ...data.user,
          created_at: new Date(data.user.created_at),
        });
        fetch(`/api/semesters/${data.user.semester_id}`)
          .then((res) => res.json())
          .then((semData) => {
            setSemester(semData.semester);
            setIsLoading(false);
          });
      });
  }, [memberId]);

  return (
    <Switch>
      <Route exact path={path}>
        {!isLoading && (
          <>
            <h1>
              {member.first_name} {member.last_name}
            </h1>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3>Details</h3>
              </div>

              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                      type="text"
                      name="first_name"
                      value={member.first_name}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                      type="text"
                      name="last_name"
                      value={member.last_name}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="paid">Paid:</label>
                    <input
                      type="checkbox"
                      name="paid"
                      checked={member.paid}
                      style={{ margin: "0 10px" }}
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={member.email}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="faculty">Faculty</label>
                    <input
                      type="text"
                      name="faculty"
                      value={member.faculty}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="id">Student Number:</label>
                    <input
                      type="text"
                      name="id"
                      value={member.id}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="created_at">Date Added:</label>
                    <input
                      type="text"
                      name="created_at"
                      value={member.created_at.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_semester">
                      Last Semester Registered:
                    </label>
                    <input
                      type="text"
                      name="last_semester"
                      value={semester.name}
                      className="form-control"
                      readOnly
                    ></input>
                  </div>

                  <div className="form-group center">
                    <Link to={`${url}/edit`} className="btn btn-success">
                      Update
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </Route>
      <Route exact path={`${path}/edit`}>
        <MemberUpdate />
      </Route>
    </Switch>
  );
}
