import React, { ReactElement } from "react";
import { Switch, useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import SemesterCreate from "./components/SemesterCreate";

export default function SemesterCreateRoute(): ReactElement {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <SemesterCreate />
      </Route>
    </Switch>
  );
}
