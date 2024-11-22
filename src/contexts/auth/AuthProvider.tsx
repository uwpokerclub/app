import { ReactNode, useEffect, useState } from "react";
import { authContext } from "./context";
import { sendRequest } from "../../lib";
import { getSession } from "../../sdk/session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    getSession()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  const signIn = (cb: () => void) => {
    setAuthenticated(true);
    cb();
  };

  const signOut = (cb: () => void) => {
    sendRequest("session/logout", "POST")
      .then(() => {
        setAuthenticated(false);
        cb();
      })
      .catch((err) => {
        if (err instanceof SyntaxError) {
          setAuthenticated(false);
          cb();
        }
      });
  };

  const value = { authenticated, signIn, signOut };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
