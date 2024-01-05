import { Route, Routes } from "react-router-dom";
import { EditUser, ListUsers, NewUser, ShowUser } from "../features/users";

export function Users() {
  return (
    <Routes>
      <Route path="/" element={<ListUsers />} />
      <Route path="/new" element={<NewUser />} />
      <Route path="/:userId" element={<ShowUser />} />
      <Route path="/:userId/edit" element={<EditUser />} />
    </Routes>
  );
}
