import React, { ReactElement } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import SemesterCreateRoute from "./SemestersCreateRoute";
import SemesterViewRoute from "./SemesterViewRoute";
import Semesters from "./components/Semesters";

export default function SemestersRoute(): ReactElement {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Semesters />
      </Route>

      <Route exact path={`${path}/create`}>
        <SemesterCreateRoute />
      </Route>

      <Route path={`${path}/:semesterId`}>
        <SemesterViewRoute />
      </Route>
    </Switch>
  );
}
