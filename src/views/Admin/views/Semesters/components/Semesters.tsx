import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import SemestersList from "../views/SemestersList";
import NewSemester from "../views/NewSemester";
import SemesterInfo from "../views/SemesterInfo";
import NewMembership from "../views/NewMembership";

function Semesters(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<SemestersList />} />
      <Route path="/new" element={<NewSemester />} />
      <Route path="/:semesterId" element={<SemesterInfo />} />
      <Route path="/:semesterId/new-member" element={<NewMembership />} />
    </Routes>
  );
}

export default Semesters;