import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../lib";
import { LoginForm } from "./LoginForm";

export function CreateLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // After 2 seconds, hide the success message
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccess]);

  const handleSubmit = async (username: string, password: string, role: string) => {
    const { status } = await sendAPIRequest("login", "POST", { username, password, role });
    if (status === 201) {
      setShowSuccess(true);
    } else if (status === 400 || status === 401) {
      setErrorMessage("Invalid username or password.");
    } else if (status === 403) {
      setErrorMessage("You are not authorized to create a new login.");
    } else {
      setErrorMessage("An unknown error occurred. Contact a system admin.");
    }
  };

  return (
    <div className="center">
      {errorMessage && (
        <div role="alert" className="alert alert-danger">
          <span>{errorMessage}</span>
        </div>
      )}

      {showSuccess && (
        <div className="alert alert-success" role="alert">
          Successfully created this user!
        </div>
      )}

      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-3" />

        <div className="col-md-4 col-lg-4 col-sm-6">
          <h1>Create a Login</h1>
          <LoginForm create onSubmit={handleSubmit} />
        </div>

        <div className="col-md-4 col-lg-4 col-sm-3" />
      </div>
    </div>
  );
}
