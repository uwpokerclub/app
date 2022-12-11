import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";

import { Semester } from "../../../../../types";

function NewEvent(): ReactElement {
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [format, setFormat] = useState("");
  const [notes, setNotes] = useState("");
  const [semesterId, setSemesterId] = useState("");

  const { data } = useFetch<Semester[]>("semesters");

  useEffect(() => {
    if (data) {
      setSemesters(data);
    }
  }, [data]);

  const createEvent = (e: React.FormEvent) => {
    e.preventDefault();

    sendAPIRequest("events", "POST", {
      name: name,
      startDate: new Date(startDate),
      format: format,
      notes: notes,
      semesterId: semesterId,
    }).then(({ status }) => {
      if (status === 201) {
        navigate("../");
      }
    });
  };

  return (
    <div>
      <h1 className="center">New Event</h1>

      <div className="row">
        <div className="col-md-3" />

        <div className="col-md-6">
          <div className="mx-auto">
            <form onSubmit={createEvent}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester_id">Term</label>
                <select
                  name="semester_id"
                  className="form-control"
                  value={semesterId}
                  onChange={(e) => setSemesterId(e.target.value)}
                >
                  <option>Select Semester</option>
                  {semesters.map((semester) => (
                    <option value={semester.id}>{semester.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="start_date">Date</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="format">Format</label>
                <input
                  type="text"
                  placeholder="NLHE"
                  name="format"
                  className="form-control"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Details</label>
                <textarea
                  rows={6}
                  name="notes"
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="mx-auto">
                  <button
                    type="submit"
                    value="submit"
                    className="btn btn-success btn-responsive"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-3" />
      </div>
    </div>
  );
}

export default NewEvent;
