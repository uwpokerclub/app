import { Route, Routes } from "react-router-dom";
import { AdminNavbar } from "../components";
import { Home } from "./Home";
import { Users } from "./Users";
import { Semesters } from "./Semesters";
import { Rankings } from "./Rankings";
import { Events } from "./Events";

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
            <Route path="/events/*" element={<Events />} />
            <Route path="/semesters/*" element={<Semesters />} />
            <Route path="/rankings/*" element={<Rankings />} />
          </Routes>
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
}
