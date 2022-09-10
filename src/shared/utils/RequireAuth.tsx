import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function RequireAuth({ children }: { children: JSX.Element }): ReactElement {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children;
}

export default RequireAuth;