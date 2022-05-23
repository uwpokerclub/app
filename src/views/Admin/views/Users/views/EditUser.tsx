import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faculties } from "../../../../../constants";

function EditUser(): ReactElement {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [id, setId] = useState("");
  const [createdAt, setCreatedAt] = useState<Date>();
  const [semesterId, setSemesterId] = useState("");

  // handleDelete sends a DELETE request to the API to remove the user.
  const handleDelete = () => {
    fetch(`/api/users/${userId}`, { method: "DELETE" }).then((res) => {
      if (res.status === 200) {
        return navigate("../../users", { replace: true });
      }
    });
  };

  // handleSubmit sends an update to the api for this user when the form is submitted.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        faculty,
        semesterId,
      }),
    });

    if (res.status === 200) {
      return navigate(`../${userId}`);
    }
  };

  // Fetch user information
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(({ user }) => {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setFaculty(user.faculty);
        setSemesterId(user.semester_id);
        setId(user.id);
        setCreatedAt(new Date(user.created_at));

        setIsLoading(false);
      });
  }, [userId]);

  return (
    <div>
      {!isLoading && (
        <>
          <h1>
            {firstName} {lastName}
          </h1>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Edit Member</h3>
            </div>

            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="form-group">
                  <label htmlFor="faculty">Faculty:</label>
                  <select
                    name="faculty"
                    className="form-control"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                  >
                    {faculties.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="id">Student Number:</label>
                  <input
                    type="text"
                    name="id"
                    value={id}
                    className="form-control"
                    readOnly
                  ></input>
                </div>

                <div className="form-group">
                  <label htmlFor="created_at">Date Added:</label>
                  <input
                    type="text"
                    name="created_at"
                    value={
                      createdAt !== null
                        ? createdAt?.toLocaleDateString("en-US", {
                            dateStyle: "full",
                          })
                        : "Unknown"
                    }
                    className="form-control"
                    readOnly
                  ></input>
                </div>

                <div className="form-group center">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete()}
                  >
                    Delete Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditUser;