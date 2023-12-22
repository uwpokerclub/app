import { useAuth } from "./context";
import { Navigate, useLocation } from "react-router-dom";

type RequireAuthProps = {
  children: JSX.Element;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
