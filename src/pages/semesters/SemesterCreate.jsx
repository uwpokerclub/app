import React from "react";

export default function SemesterCreate() {
  return (
    <div>
      <h1 className="center">
        New Semester
      </h1>
      <div className="row">

        <div className="col-md-3" />

        <div className="col-md-6">
          <div className="mx-auto">
            <form onSubmit={createSemester}>

              <div className="form-group">
                <label for="name">
                  Name
                </label>
                <input type="text" name="name" className="form-control" />
              </div>

              <div className="form-group">
                <label for="start_date">
                  Start Date
                </label>
                <input type="date" name="start_date" className="form-control" />
              </div>

              <div className="form-group">
                <label for="end_date">
                  End Date
                </label>
                <input type="date" name="end_date" className="form-control" />
              </div>

              <div className="form-group">
                <label for="meta">
                  Additional Details
                </label>
                <textarea rows="6" name="meta" className="form-control" />
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

const createSemester = () => {
  return ;
};
