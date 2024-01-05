import { Route, Routes } from "react-router-dom";
import { AdminNavbar } from "../components";
import { Home } from "./Home";
import { Users } from "./Users";

export function Admin() {
  return (
    <>
      <AdminNavbar />

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/*" element={<Users />} />
          </Routes>
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
}
