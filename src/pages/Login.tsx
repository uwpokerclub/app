import { Route, Routes } from "react-router-dom";
import { CreateLogin, NewSession } from "../features/login";
import { RequireAuth } from "../contexts";

export function Login() {
  return (
    <div className="row">
      <div className="col-md-1" />
      <div className="col-md-10">
        <Routes>
          <Route path="/" element={<NewSession />} />
          <Route
            path="/new"
            element={
              <RequireAuth>
                <CreateLogin />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      <div className="col-md-1"></div>
    </div>
  );
}
