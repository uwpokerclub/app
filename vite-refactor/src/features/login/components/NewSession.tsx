import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts";
import { sendAPIRequest } from "../../../lib";
import { LoginForm } from "./LoginForm";

export function NewSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const from = (location.state as { from: { pathname: string } })?.from?.pathname || "/admin";

  const handleLogin = (username: string, password: string): void => {
    sendAPIRequest("login/session", "POST", { username, password }).then(({ status }) => {
      if (status === 201) {
        auth.signIn(() => navigate(from, { replace: true }));
        return;
      }

      if (status === 400 || status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("An internal error occurred.");
      }
    });
  };

  return (
    <div className="center">
      {errorMessage && (
        <div role="alert" className="alert alert-danger">
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-3" />

        <div className="col-md-4 col-lg-4 col-sm-6">
          <h1>Login</h1>
          <LoginForm onSubmit={handleLogin} />
        </div>

        <div className="col-md-4 col-lg-4 col-sm-3" />
      </div>
    </div>
  );
}
