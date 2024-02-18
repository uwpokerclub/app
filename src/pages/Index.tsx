import { ReactElement } from "react";
import { ResponsiveNavbar } from "../components";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Gallery } from "./Gallery";
import { Sponsors } from "./Sponsors";
import { Join } from "./Join";

export function Index(): ReactElement {
  const location = useLocation();

  return (
    <>
      <ResponsiveNavbar />
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/join" element={<Join />} />
        <Route path="/*" element={<Navigate to="/join" state={{ from: location }} replace />}></Route>
      </Routes>
    </>
  );
}