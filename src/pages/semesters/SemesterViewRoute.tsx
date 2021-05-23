import React, { ReactElement } from "react";
import { Switch, useParams, useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import SemesterNewMember from "./components/SemesterNewMember";

import SemesterView from "./components/SemesterView";

export default function SemesterViewRoute(): ReactElement {
  const { path } = useRouteMatch();
  const { semesterId } = useParams<{ semesterId: string }>();

  return (
    <Switch>
      <Route exact path={path}>
        <SemesterView semesterId={semesterId} />
      </Route>

      <Route path={`${path}/new-member`}>
        <SemesterNewMember />
      </Route>
    </Switch>
  );
}
