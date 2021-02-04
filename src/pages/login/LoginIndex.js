import React from "react"

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import LoginCreate from "./LoginCreate";

export default function LoginIndex() {
  const { path, url } = useRouteMatch();
  const message = "";

  return (
    <Switch>
      
      <Route exact path={path}>
        <div className="center">
        
          {
            message &&
            <div role="alert" className="alert alert-danger">
              <span>{message}</span>
            </div>
          }

          <h1>
            Login
          </h1>

          <div class="row">

            <div class="col-md-4 col-lg-4 col-sm-3" />

            <div class="col-md-4 col-lg-4 col-sm-6">
              <form onSubmit={login} className="content-wrap">
                
                <div className="form-group">
                  <label for="username">
                    Username:
                  </label>
                  <input type="text" name="username" className="form-control" />
                </div>

                <div className="form-group">
                  <label for="password">
                  Password:
                  </label>
                  <input type="password" name="password" className="form-control" />
                </div>

                <button type="submit" className="btn btn-success">
                  Login
                </button>

              </form>
            </div>

            <div class="col-md-4 col-lg-4 col-sm-3" />

          </div>
        </div>
      </Route>

      <Route exact path={`${path}/create`}>
        <LoginCreate />
      </Route>

    </Switch>
  )
}

const login = () => {
  return ;
}
