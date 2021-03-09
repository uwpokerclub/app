import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

type AuthContext = {
  authenticated: boolean;
  signin: (cb: () => void) => void;
  signout: (cb: () => void) => void;
};

const authContext = createContext<AuthContext>(null);

export function useAuth(): AuthContext {
  return useContext(authContext);
}

function useProvideAuth(): AuthContext {
  const [authenticated, setAuthenticated] = useState(
    document.cookie.split(";").some((item) => item.trim().startsWith("pctoken"))
  );

  const signin = (cb: () => void) => {
    setAuthenticated(true);
    cb();
  };

  const signout = (cb: () => void) => {
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

export interface Props {
  children: ReactNode;
}

export default function ProvideAuth({ children }: Props): ReactElement {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
