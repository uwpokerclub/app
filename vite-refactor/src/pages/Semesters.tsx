import { Routes, Route } from "react-router-dom";
import { NewSemester, SemestersList, SemesterInfo } from "../features/semesters";

export function Semesters() {
  return (
    <Routes>
      <Route path="/" element={<SemestersList />} />
      <Route path="/new" element={<NewSemester />} />
      <Route path="/:semesterId" element={<SemesterInfo />} />
    </Routes>
  );
}
