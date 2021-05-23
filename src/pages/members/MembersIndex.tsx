import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import MemberNew from "./MemberNew";
import MemberShow from "./MemberShow";
import MembersTable from "./MembersTable";

export default function MembersIndex(): ReactElement {
  const { path, url } = useRouteMatch();

  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleExport = (e: FormEvent) => {
    e.preventDefault();

    fetch("/api/users/export", { method: "POST" })
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
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

    Promise.all(requests).then(([userData, semesterData]) => {
      setMembers(userData.users);
      setFilteredMembers(userData.users);
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
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="btn-group">
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
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="input-group">
                  <span className="input-group-btn">
                    <button type="button" className="btn btn-default">
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
