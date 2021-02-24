import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./ProvideAuth";

export default function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
