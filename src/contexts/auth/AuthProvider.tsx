import { ReactNode, useState } from "react";
import { authContext } from "./context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const cookieKey = import.meta.env.DEV ? "uwpsc-dev-session-id" : "uwpsc-session-id";

  const [authenticated, setAuthenticated] = useState(
    document.cookie.split(";").some((item) => item.trim().startsWith(cookieKey)),
  );

  const signIn = (cb: () => void) => {
    setAuthenticated(true);
    cb();
  };

  const signOut = (cb: () => void) => {
    setAuthenticated(false);
    return cb();
  };

  const value = { authenticated, signIn, signOut };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
