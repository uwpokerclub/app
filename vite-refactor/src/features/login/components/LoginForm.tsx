import { MouseEvent, useRef } from "react";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(usernameRef.current?.value || "", passwordRef.current?.value || "");
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

      <button type="button" className="btn btn-success" onClick={(e) => handleClick(e)}>
        Login
      </button>
    </form>
  );
}
