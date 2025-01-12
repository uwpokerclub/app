import { MouseEvent, useRef, useState } from "react";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => Promise<void>;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  /**
   * handleClick handles the form submission after the user clicks on the submit button
   * @param e MouseEvent<HTMLButtonElement>
   */
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Disable submit button so requests can't be spammed
    setSubmitDisabled(true);

    // Call onSubmit event handler
    await onSubmit(usernameRef.current?.value || "", passwordRef.current?.value || "");

    // Enable button, so in case of an error state it can be used again
    setSubmitDisabled(false);
  };

  return (
    <form className="content-wrap">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input ref={usernameRef} type="text" name="username" className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" name="password" className="form-control" />
      </div>

      <button
        data-qa="login-submit"
        type="submit"
        className="btn btn-success"
        disabled={submitDisabled}
        onClick={(e) => handleClick(e)}
      >
        Login
      </button>
    </form>
  );
}
