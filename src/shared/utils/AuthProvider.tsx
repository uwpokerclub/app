import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  authenticated: boolean;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
};

const authContext = createContext<AuthContextType>(null!);

export function useAuth(): AuthContextType {
  return useContext(authContext);
}

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [authenticated, setAuthenticated] = useState(
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("pctoken")),
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
