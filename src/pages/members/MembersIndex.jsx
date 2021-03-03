import React, { useEffect, useState } from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import MemberNew from "./MemberNew";
import MemberShow from "./MemberShow";

import TermSelector from "../../components/TermSelector/TermSelector";

export default function MembersIndex() {
  const { path, url } = useRouteMatch();

  const [isLoading, setIsLoading] = useState(true);
  const [semesters, setSemesters] = useState([]);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onSelectTerm = (semesterId) => {
    if (semesterId === "All") {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(
        members.filter((member) => member.semester_id === semesterId)
      );
    }
  };

  const handleExport = (e) => {
    e.preventDefault();

    fetch("/api/users/export", { method: "POST" })
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);

    if (!e.target.value) {
      setFilteredMembers(members);
      return;
    }

    setFilteredMembers(
      members.filter((m) =>
        RegExp(e.target.value, "i").test(`${m.first_name} ${m.last_name}`)
      )
    );
  };

  useEffect(() => {
    const requests = [];

    requests.push(fetch("/api/users").then((res) => res.json()));
    requests.push(fetch("/api/semesters").then((res) => res.json()));

    Promise.all(requests).then(([userData, semesterData]) => {
      setMembers(userData.users);
      setFilteredMembers(userData.users);
      setSemesters(semesterData.semesters);
      setIsLoading(false);
    });
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        {!isLoading && (
          <div id="members">
            <h1> Members ({filteredMembers.length})</h1>
            <div className="row">
              <div className="form-group">
                <TermSelector semesters={semesters} onSelect={onSelectTerm} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <Link
                  to={`${url}/new`}
                  className="btn btn-primary btn-responsive"
                >
                  Add Members
                </Link>

                <form className="form-inline">
                  <div className="form-group">
                    <input type="hidden" className="form-control"></input>
                  </div>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(e) => handleExport(e)}
                  >
                    Export
                  </button>
                </form>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="input-group">
                  <span className="input-group-btn">
                    <button type="search" className="btn btn-default">
                      Search
                    </button>
                  </span>

                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control search"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                  ></input>
                </div>
              </div>
            </div>

            <MembersTable url={url} members={filteredMembers} />
          </div>
        )}
      </Route>
      <Route exact path={`${path}/new`}>
        <MemberNew />
      </Route>
      <Route path={`${path}/:memberId`}>
        <MemberShow />
      </Route>
    </Switch>
  );
}

function MembersTable({ url, members }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th data-sort="studentno" className="sort">
              Student Number
            </th>
            <th data-sort="fname" className="sort">
              First Name
            </th>
            <th data-sort="lname" className="sort">
              Last Name
            </th>
            <th data-sort="email" className="sort">
              Email
            </th>
            <th data-sort="questid" className="sort">
              Quest ID
            </th>
            <th data-sort="paid" className="sort">
              Paid
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className={`${m.paid === "Yes" ? "" : "danger"}`}>
              <td className="studentno">
                <Link to={`${url}/${m.id}`}>{m.id}</Link>
              </td>
              <td className="fname">{m.first_name}</td>
              <td className="lname">{m.last_name}</td>
              <td className="email">{m.email}</td>
              <td className="questid">{m.quest_id}</td>
              <td className="paid">{m.paid ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
