import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "../../utils/ProvideAuth";

export default function LoginCreate() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { from } = location.state || { from: { pathname: "/" } };

  if (auth.authenticated) {
    history.replace(from);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 201) {
      history.replace("/login");
      return;
    }

    const data = await res.json();

    if (res.status === 400) {
      setErrorMessage("Invalid username or password.");
      return;
    } else if (res.status === 403) {
      setErrorMessage(data.message);
      return;
    }
  };

  return (
    <div className="center">
      {errorMessage && (
        <div role="alert" className="alert alert-danger">
          <span>{errorMessage}</span>
        </div>
      )}

      <h1>Create a Login</h1>

      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-3" />

        <div className="col-md-4 col-lg-4 col-sm-6">
          <form className="content-wrap">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => handleSubmit(e)}
            >
              Create
            </button>
          </form>
        </div>

        <div className="col-md-4 col-lg-4 col-sm-3" />
      </div>
    </div>
  );
}
