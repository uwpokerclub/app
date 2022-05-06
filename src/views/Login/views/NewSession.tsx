import React, { ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/utils/AuthProvider";
import LoginForm from "../components/LoginForm";

function NewSession(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const from = (location.state as { from: { pathname: string }})?.from?.pathname || "/";

  const handleLogin = (username: string, password: string): void => {
    fetch("/api/login/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    }).then((res) => {
      if (res.status === 201) {
        auth.signIn(() => navigate(from, { replace: true}));
        return;
      }

      if (res.status === 400 || res.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("An internal error occurred.")
      }
    });
  }

  return (
    <div className="center">
      {errorMessage && (
        <div role="alert" className="alert alert-danger">
          <span>{errorMessage}</span>
        </div>
      )}

      <h1>Login</h1>

      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-3" />

        <div className="col-md-4 col-lg-4 col-sm-6">
          <LoginForm onClick={handleLogin} />
        </div>

        <div className="col-md-4 col-lg-4 col-sm-3" />
      </div>
    </div> 
  ) 
}

export default NewSession;