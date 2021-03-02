import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [authenticated, setAuthenticated] = useState(
    document.cookie.split(";").some((item) => item.trim().startsWith("pctoken"))
  );

  const signin = (cb) => {
    setAuthenticated(true);
    cb();
  };

  const signout = (cb) => {
    document.cookie = "pctoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthenticated(false);
    return cb();
  };

  return {
    authenticated,
    signin,
    signout,
  };
}

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
