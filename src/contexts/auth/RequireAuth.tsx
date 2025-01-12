import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.authenticated === null) {
    return <></>;
  }

  if (!auth.authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
