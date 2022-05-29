import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { GetUserResponse, User } from "../../../../../types";

function ShowUser(): ReactElement {
  const { userId } = useParams<{ userId: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  // Fetch user info
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data: GetUserResponse) => {
        setUser({
          ...data.user,
          created_at: new Date(data.user.created_at)
        });

        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading || !user) {
    return <></>;
  }

  return (
    <>
      <h1>
        {user.first_name} {user.last_name}
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
                value={user.first_name}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                value={user.email}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="faculty">Faculty</label>
              <input
                type="text"
                name="faculty"
                value={user.faculty}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="id">Student Number:</label>
              <input
                type="text"
                name="id"
                value={user.id}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="form-group">
              <label htmlFor="created_at">Date Added:</label>
              <input
                type="text"
                name="created_at"
                value={user.created_at.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="form-group center">
              <Link to={`edit`} className="btn btn-success">
                Update
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShowUser;
