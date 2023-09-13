import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import SemesterCards from "../views/SemesterCards";
import SemesterRankings from "../views/SemesterRankings";

function Rankings(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<SemesterCards />} />
      <Route path="/:semesterId" element={<SemesterRankings />} />
    </Routes>
  );
}

export default Rankings;
