import React from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import MemberNew from "./MemberNew";
import MemberShow from "./MemberShow";

import TermSelector from "../../components/term-selector/TermSelector"

export default function MembersIndex() {
  const { path, url } = useRouteMatch();

  // Dummy data for now
  const semesters = ["Winter 2021", "Spring 2021", "Fall 2021"]
  const members = [
    {
      studentNum: "20780648",
      firstName: "Adam",
      lastName: "Mahood",
      email: "asmahood@uwaterloo.ca",
      questId: "asmahood",
      paid: "Yes"
    }
  ]

  return (
    <Switch>
      <Route exact path={path}>
        <div id="members">
          <h1> Members ({members.length})</h1>
          <div className="row">
            <div className="form-group">
              <TermSelector semesters={semesters} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <Link to={`${url}/new`} className="btn btn-primary btn-responsive">Add Members</Link>

              <form className="form-inline">
                <div className="form-group">
                  <input type="hidden" className="form-control"></input>
                </div>

                <button type="submit" className="btn btn-success">Export</button>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="input-group">
                <span className="input-group-btn">
                  <button type="search" className="btn btn-default">Search</button>
                </span>

                <input type="text" placeholder="Search..." className="form-control search"></input>
              </div>
            </div>
          </div>

          <MembersTable url={url} members={members} />
        </div>
      </Route>
      <Route exact path={`${path}/new`}>
        <MemberNew />
      </Route>
      <Route path={`${path}/:memberId`}>
        <MemberShow />
      </Route>
    </Switch>
  )
}

function MembersTable({ url, members }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th data-sort="studentno" className="sort">Student Number</th>
            <th data-sort="fname" className="sort">First Name</th>
            <th data-sort="lname" className="sort">Last Name</th>
            <th data-sort="email" className="sort">Email</th>
            <th data-sort="questid" className="sort">Quest ID</th>
            <th data-sort="paid" className="sort">Paid</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.studentNum} className={`${m.paid === "Yes" ? "" : "danger"}`}>
              <td className="studentno">
                <Link to={`${url}/${m.studentNum}`}>{m.studentNum}</Link>
              </td>
              <td className="fname">{m.firstName}</td>
              <td className="lname">{m.lastName}</td>
              <td className="email">{m.email}</td>
              <td className="questid">{m.questId}</td>
              <td className="paid">{m.paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
