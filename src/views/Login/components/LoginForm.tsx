import React, { ReactElement, useState } from "react";

function LoginForm({
  onClick,
}: {
  onClick(username: string, password: string): void
}): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClick(username, password);
  }

  return (
    <form className="content-wrap">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn btn-success"
        onClick={(e) => handleClick(e)}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm;