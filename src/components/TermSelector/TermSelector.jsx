import React, { useState } from "react";

export default function TermSelector({ semesters, onSelect }) {
  const [value, setValue] = useState('');

  const handleChange = (selected) => {
    setValue(selected);
    onSelect(selected);
  };

  return (
    <select className="form-control" value={value} onChange={(e) => handleChange(e.target.value)}>
      <option>All</option>
      {semesters.map((semester) => (
        <option key={semester.id} value={semester.id}>{semester.name}</option>
      ))}
    </select>
  );
}
