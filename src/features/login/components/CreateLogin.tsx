import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts";
import { useState } from "react";
import { sendAPIRequest } from "../../../lib";
import { LoginForm } from "./LoginForm";

export function CreateLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  if (auth.authenticated) {
    const from = (location.state as { from: { pathname: string } })?.from?.pathname || "/admin";
    navigate(from, { replace: true });
  }

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (username: string, password: string): void => {
    sendAPIRequest("login", "POST", { username, password }).then(({ status }) => {
      if (status === 201) {
        navigate("/login", { replace: true });
      } else if (status === 400 || status === 401) {
        setErrorMessage("Invalid username or password.");
      } else if (status === 403) {
        setErrorMessage("You are not authorized to create a new login.");
      } else {
        setErrorMessage("An unknown error occurred. Contact an admin.");
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
          <h1>Create a Login</h1>
          <LoginForm onSubmit={handleSubmit} />
        </div>

        <div className="col-md-4 col-lg-4 col-sm-3" />
      </div>
    </div>
  );
}
