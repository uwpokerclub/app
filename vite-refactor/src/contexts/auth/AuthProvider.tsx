import { ReactNode, useState } from "react";
import { authContext } from "./context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    document.cookie.split(";").some((item) => item.trim().startsWith("pctoken")),
  );

  const signIn = (cb: () => void) => {
    setAuthenticated(true);
    cb();
  };

  const signOut = (cb: () => void) => {
    document.cookie = "pctoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthenticated(false);
    return cb();
  };

  const value = { authenticated, signIn, signOut };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
