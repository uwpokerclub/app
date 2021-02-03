import React from "react";

import { useParams } from "react-router-dom";

export default function MemberUpdate() {
  const { memberId } = useParams()

  const semesters = ["Winter 2021", "Spring 2021", "Fall 2021"];
  const faculties = ["AHS", "Arts", "Engineering", "Environment", "Math", "Science"];

  const member = {
    id: memberId,
    firstName: "Adam",
    lastName: "Mahood",
    paid: true,
    email: "asmahood@uwaterloo.ca",
    faculty: "Math",
    createdAt: new Date(),
    lastSemesterRegistered: "Winter 2021"
  }

  return (
    <div>
      <h1>{member.firstName} {member.lastName}</h1>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Edit Member</h3>
        </div>

        <div className="panel-body">
          <form>
            <div className="form-group">
              <label for="first_name">First Name:</label>
              <input type="text" name="first_name" value={member.firstName} className="form-control"></input>
            </div>

            <div className="form-group">
              <label for="last_name">Last Name:</label>
              <input type="text" name="last_name" value={member.lastName} className="form-control"></input>
            </div>

            <div className="form-group">
              <label for="paid">Paid:</label>
              <input type="checkbox" name="paid" checked={member.paid} style={{ margin: "0 10px" }}></input>
            </div>

            <div className="form-group">
              <label for="email">Email:</label>
              <input type="text" name="email" value={member.email} className="form-control"></input>
            </div>

            <div className="form-group">
              <label for="faculty">Faculty:</label>
              <select name="faculty" id="facultyselect" className="form-control">
                {faculties.map((f) => (
                  <option value={f} selected={member.faculty === f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label for="id">Student Number:</label>
              <input type="text" name="id" value={member.id} className="form-control" readOnly></input>
            </div>

            <div className="form-group">
              <label for="created_at">Date Added:</label>
              <input type="text" name="created_at" value={member.createdAt.toLocaleDateString("en-US", { dateStyle: "full" })} className="form-control" readOnly></input>
            </div>

            <div className="form-group">
              <label for="last_semester">Semester:</label>
              <select name="semester_id" className="form-control">
                {semesters.map((s) => (
                  <option selected={member.lastSemesterRegistered === s}>{s}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success">Save</button>
          </form>

          <form>
            <input type="hidden" name="id" value={member.id}></input>
            <button type="submit" className="btn btn-danger">Delete Member</button>
          </form>
        </div>
      </div>
    </div>
  )
}
