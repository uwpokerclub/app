import React, { ReactNode, ReactElement } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { useAuth } from "./ProvideAuth";

export interface Props {
  children: ReactNode;
}

export default function PrivateRoute({
  children,
  ...rest
}: Props & RouteProps): ReactElement {
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
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
