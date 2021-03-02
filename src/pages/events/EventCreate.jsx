import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function EventCreate() {
  const history = useHistory();

  const [semesters, setSemesters] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [format, setFormat] = useState("");
  const [notes, setNotes] = useState("");
  const [semesterId, setSemesterId] = useState("");

  useEffect(() => {
    fetch("/api/semesters")
      .then((res) => res.json())
      .then((data) => setSemesters(data.semesters));
  }, []);

  const createEvent = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "startDate": startDate,
        "format": format,
        "notes": notes,
        "semesterId": semesterId
      })
    });

    if (res.status === 201) {
      return history.push("/events");
    }
  };

  return (
    <div>
      <h1 className="center">
        New Event
      </h1>

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
                  onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="semester_id">Term</label>
                <select 
                  name="semester_id" 
                  className="form-control"
                  value={semesterId}
                  onChange={(e) => setSemesterId(e.target.value)} >
                    <option>Select Semester</option>
                    {semesters.map((semester) => (
                      <Semester semester={semester} />
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
                  onChange={(e) => setStartDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="format">Format</label>
                <input 
                  type="text" 
                  placeholder="NLHE"
                  name="format" 
                  className="form-control"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Details</label>
                <textarea 
                  rows="6" 
                  name="notes" 
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)} />
              </div>

              <div className="row">
                <div class="mx-auto">
                  <button type="submit" value="submit" className="btn btn-success btn-responsive">
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

const Semester = ({ semester }) => {
  return (
    <option value={semester.id}>
      {semester.name}
    </option>
  );
};
