import React from "react";

export default function MemberNew() {
  const semesters = ["Winter 2021", "Spring 2021", "Fall 2021"]
  const faculties = ["AHS", "Arts", "Engineering", "Environment", "Math", "Science"];

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <h1 className="center">Sign Up</h1>
        <div className="mx-auto">
          <form>
            <div className="form-group">
              <label for="first_name">First Name:</label>
              <input
                type="text"
                placeholder="First name"
                name="first_name"
                className="form-control">
              </input>
            </div>

            <div className="form-group">
              <label for="last_name">Last Name:</label>
              <input
                type="text"
                placeholder="Last name"
                name="last_name"
                className="form-control">
              </input>
            </div>

            <div className="form-group">
              <label for="email">Email:</label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="form-control">
              </input>
            </div>

            <div className="form-group">
              <label for="facultyselect">Faculty:</label>
              <select name="faculty" id="facultyselect" className="form-control">
                {faculties.map((f) => (
                  <option value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="paid">Paid:</label>
              <input type="checkbox" name="paid" className="form-control"></input>
            </div>

            <div className="form-group">
              <label for="quest_id">Quest ID:</label>
              <input
                type="text"
                placeholder="Quest ID"
                name="quest_id"
                className="form-control">
              </input>
            </div>

            <div className="form-group">
              <label for="id">Student Number:</label>
              <input
                type="text"
                placeholder="Student Number"
                name="id"
                className="form-control">
              </input>
            </div>

            <div className="form-group">
              <label for="semester">Semester:</label>
              <select name="semester_id" className="form-control">
                <option>Choose Semester</option>
                {semesters.map((s) => (
                  <option>{s}</option>
                ))}
              </select>
            </div>

            <div className="row">
              <div className="mx-auto">
                <button type="submit" value="Submit" className="btn btn-success btn-responsive">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  )
}
