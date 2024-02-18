import { Route, Routes } from "react-router-dom";
import { EventDetails, EventRegister, ListEvents, NewEvent } from "../features/events";

export function Events() {
  return (
    <Routes>
      <Route path="/" element={<ListEvents />} />
      <Route path="/new" element={<NewEvent />} />
      <Route path="/:eventId" element={<EventDetails />} />
      <Route path="/:eventId/register" element={<EventRegister />} />
    </Routes>
  );
}
