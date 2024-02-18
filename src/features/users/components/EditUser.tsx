import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { User } from "../../../types";
import { useEffect, useState } from "react";
import { sendAPIRequest } from "../../../lib";
import { FACULTIES } from "../../../data";

export function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [id, setId] = useState("");
  const [createdAt, setCreatedAt] = useState<Date>();

  const { data: user, isLoading } = useFetch<User>(`users/${userId}`);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setFaculty(user.faculty);
      setId(user.id);
      setCreatedAt(new Date(user.createdAt));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendAPIRequest(`users/${userId}`, "PATCH", {
      firstName,
      lastName,
      email,
      faculty,
    }).then(({ status }) => {
      if (status === 200) {
        return navigate(`../${userId}`);
      }
    });
  };

  const handleDelete = () => {
    sendAPIRequest(`users/${userId}`, "DELETE").then(({ status }) => {
      if (status === 204) {
        return navigate("../../users", { replace: true });
      }
    });
  };

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
                <div className="mb-3">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  ></input>
                </div>

                <div className="mb-3">
                  <label htmlFor="faculty">Faculty:</label>
                  <select
                    name="faculty"
                    className="form-control"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                  >
                    {FACULTIES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="id">Student Number:</label>
                  <input type="text" name="id" value={id} className="form-control" disabled></input>
                </div>

                <div className="mb-3">
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
                    disabled
                  ></input>
                </div>

                <div className="mb-3 text-center">
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>

                  <button type="button" className="btn btn-danger" onClick={() => handleDelete()}>
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
