import { createContext, useContext } from "react";

type AuthContext = {
  authenticated: boolean | null;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
};

export const authContext = createContext<AuthContext>({
  authenticated: null,
  signIn: () => null,
  signOut: () => null,
});

export function useAuth(): AuthContext {
  return useContext(authContext);
}
