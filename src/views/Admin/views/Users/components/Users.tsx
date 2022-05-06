import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import EditUser from "../views/EditUser";

import ListUsers from "../views/ListUsers";
import NewUser from "../views/NewUser";
import ShowUser from "../views/ShowUser";

function Users(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<ListUsers />} />
      <Route path="/new" element={<NewUser />} />
      <Route path="/:userId" element={<ShowUser />} />
      <Route path="/:userId/edit" element={<EditUser />} />
    </Routes>
  );
}

export default Users;