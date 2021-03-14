import React, { FormEvent, ReactElement, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import { useAuth } from "../../utils/ProvideAuth";
import LoginCreate from "./LoginCreate";

export default function LoginIndex(): ReactElement {
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { from } = location.state || { from: { pathname: "/" } };

  if (auth.authenticated) {
    history.replace(from);
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 201) {
      auth.signin(() => {
        history.replace(from);
      });
      return;
    }

    const data = await res.json();

    if (res.status === 401) {
      setErrorMessage(data.message);
      return;
    } else if (res.status === 400) {
      setErrorMessage("Invalid username or password.");
      return;
    }
  };

  return (
    <Switch>
      <Route exact path={path}>
        <div className="center">
          {errorMessage && (
            <div role="alert" className="alert alert-danger">
              <span>{errorMessage}</span>
            </div>
          )}

          <h1>Login</h1>

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
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </button>
              </form>
            </div>

            <div className="col-md-4 col-lg-4 col-sm-3" />
          </div>
        </div>
      </Route>

      <Route exact path={`${path}/create`}>
        <LoginCreate />
      </Route>
    </Switch>
  );
}
