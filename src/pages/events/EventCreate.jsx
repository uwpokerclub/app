import React from "react";

export default function EventCreate() {
  const semesters = [
    {
      id: 0,
      name: "Spring 2020",
    },
    {
      id: 1,
      name: "Fall 2020",
    },
    {
      id: 2,
      name: "Winter 2021",
    },
  ];

  return (
    <div>
      <h1 className="center">New Event</h1>

      <div className="row">
        <div className="col-md-3" />

        <div className="col-md-6">
          <div className="mx-auto">
            <form onSubmit={createEvent}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" />
              </div>

              <div className="form-group">
                <label for="term-select">Term</label>
                <select
                  id="term-select"
                  name="semester_id"
                  className="form-control"
                >
                  {semesters.map((semester) => (
                    <Semester semester={semester} />
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Format</label>
                <input type="text" name="format" className="form-control" />
              </div>

              <div className="form-group">
                <label>Additional Details</label>
                <textarea rows="6" name="notes" className="form-control" />
              </div>

              <div className="row">
                <div class="mx-auto">
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

const Semester = ({ semester }) => {
  return <option value={semester.id}>{semester.name}</option>;
};

const createEvent = () => {
  return;
};
