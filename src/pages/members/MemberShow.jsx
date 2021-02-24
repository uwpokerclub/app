import React from "react";

import { Route, Link, Switch, useParams, useRouteMatch } from "react-router-dom";

import MemberUpdate from "./MemberUpdate";

export default function MemberShow() {
  const { path, url } = useRouteMatch();
  const { memberId } = useParams();

  const member = {
    id: memberId,
    firstName: "Adam",
    lastName: "Mahood",
    paid: true,
    email: "asmahood@uwaterloo.ca",
    faculty: "Math",
    createdAt: new Date(),
    lastSemesterRegistered: "Winter 2021"
  };

  return (
    <Switch>
      <Route exact path={path}>
        <h1>{member.firstName} {member.lastName}</h1>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>Details</h3>
          </div>

          <div className="panel-body">
            <form>
              <div className="form-group">
                <label for="first_name">First Name:</label>
                <input type="text" name="first_name" value={member.firstName} className="form-control" readOnly></input>
              </div>

              <div className="form-group">
                <label for="last_name">Last Name:</label>
                <input type="text" name="last_name" value={member.lastName} className="form-control" readOnly></input>
              </div>

              <div className="form-group">
                <label for="paid">Paid:</label>
                <input type="checkbox" name="paid" checked={member.paid} style={{ margin: "0 10px" }} readOnly></input>
              </div>

              <div className="form-group">
                <label for="email">Email:</label>
                <input type="text" name="email" value={member.email} className="form-control" readOnly></input>
              </div>

              <div className="form-group">
                <label for="faculty">Faculty</label>
                <input type="text" name="faculty" value={member.faculty} className="form-control" readOnly></input>
              </div>

              <div className="form-group">
                <label for="id">Student Number:</label>
                <input type="text" name="id" value={member.id} className="form-control" readOnly></input>
              </div>

              <div className="form-group">
                <label for="created_at">Date Added:</label>
                <input type="text" name="created_at" value={member.createdAt.toLocaleDateString("en-US", { dateStyle: "full" })} className="form-control" readOnly></input>
              </div>

              <div className="form-group">
                <label for="last_semester">Last Semester Registered:</label>
                <input type="text" name="last_semester" value={member.lastSemesterRegistered} className="form-control" readOnly></input>
              </div>

              <Link to={`${url}/edit`} className="btn btn-success">Update</Link>
            </form>
          </div>
        </div>
      </Route>
      <Route exact path={`${path}/edit`}>
        <MemberUpdate />
      </Route>
    </Switch>
  );
}
