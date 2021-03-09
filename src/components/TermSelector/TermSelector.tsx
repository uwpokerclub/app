import React, { ReactElement, useState } from "react";
import { Semester } from "../../types";

interface Props {
  semesters: Semester[];
  onSelect: (selected: string) => void;
}

export default function TermSelector({
  semesters,
  onSelect,
}: Props): ReactElement {
  const [value, setValue] = useState("");

  const handleChange = (selected: string): void => {
    setValue(selected);
    onSelect(selected);
  };

  return (
    <select
      className="form-control"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option>All</option>
      {semesters.map((semester) => (
        <option key={semester.id} value={semester.id}>
          {semester.name}
        </option>
      ))}
    </select>
  );
}
