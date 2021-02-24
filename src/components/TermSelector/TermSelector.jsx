import React from "react";

export default function TermSelector({ semesters }) {
  return (
    <select className="form-control">
      <option>All</option>
      {semesters.map((sem) => (
        <option key={sem}>{sem}</option>
      ))}
    </select>
  );
}
