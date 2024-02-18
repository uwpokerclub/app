import { Route, Routes } from "react-router-dom";
import { RankingsTable, SemesterList } from "../features/rankings";

export function Rankings() {
  return (
    <Routes>
      <Route path="/" element={<SemesterList />} />
      <Route path="/:semesterId" element={<RankingsTable />} />
    </Routes>
  );
}
