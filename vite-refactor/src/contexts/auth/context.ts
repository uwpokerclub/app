import { createContext, useContext } from "react";

type AuthContext = {
  authenticated: boolean;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
};

export const authContext = createContext<AuthContext>({
  authenticated: false,
  signIn: () => null,
  signOut: () => null,
});

export function useAuth(): AuthContext {
  return useContext(authContext);
}
