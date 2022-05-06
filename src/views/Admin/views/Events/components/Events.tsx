import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import EventDetails from "../views/EventDetails";
import ListEvents from "../views/ListEvents";
import NewEvent from "../views/NewEvent";
import RegisterEntries from "../views/RegisterEntries";

function Events(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<ListEvents />} />
      <Route path="/new" element={<NewEvent />} />
      <Route path="/:eventId" element={<EventDetails />} />
      <Route path="/:eventId/register" element={<RegisterEntries />} />
    </Routes>
  );
}

export default Events;