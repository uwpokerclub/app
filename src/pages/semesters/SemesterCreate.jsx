import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SemesterCreate() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [meta, setMeta] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let status = 0;
    fetch("/api/semesters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        startDate,
        endDate,
        meta
      })
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((data) => {
        if (status === 201) {
          return history.push("/semesters");
        }

        if (status === 400) {
          setErrorMessage(data.message);
        }
      });
  };

  return (
    <div>
      <h1 className="center">
        New Semester
      </h1>
      <div className="row">

        <div className="col-md-3" />

        <div className="col-md-6">
          {
          errorMessage &&
          <div role="alert" className="alert alert-danger">
            <span>{errorMessage}</span>
          </div>
          }

          <div className="mx-auto">
            <form onSubmit={(e) => handleSubmit(e)}>

              <div className="form-group">
                <label htmlFor="name">
                  Name
                </label>
                <input type="text" name="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="start_date">
                  Start Date
                </label>
                <input type="date" name="start_date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">
                  End Date
                </label>
                <input type="date" name="end_date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="meta">
                  Additional Details
                </label>
                <textarea rows="6" name="meta" className="form-control" value={meta} onChange={(e) => setMeta(e)} />
              </div>

              <div className="row">
                <div className="mx-auto">
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
