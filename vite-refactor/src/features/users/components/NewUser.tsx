import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendAPIRequest } from "../../../lib";
import { FACULTIES } from "../../../data";

export function NewUser() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const facultyRef = useRef<HTMLSelectElement | null>(null);
  const questIdRef = useRef<HTMLInputElement | null>(null);
  const idRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { status } = await sendAPIRequest("users", "POST", {
      id: Number(idRef.current?.value),
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      faculty: facultyRef.current?.value,
      questId: questIdRef.current?.value,
    });

    if (status === 201) {
      return navigate("../");
    } else if (status === 500) {
      setErrorMessage("This user already exists");
    }
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        {errorMessage && (
          <div role="alert" className="alert alert-danger">
            <span>{errorMessage}</span>
          </div>
        )}
        <h1 className="text-center">Sign Up</h1>
        <div className="mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name">First Name:</label>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="John"
                name="first_name"
                className="form-control"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="last_name">Last Name:</label>
              <input ref={lastNameRef} type="text" placeholder="Doe" name="last_name" className="form-control"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                ref={emailRef}
                type="text"
                placeholder="jdoe@uwaterloo.ca"
                name="email"
                className="form-control"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="faculty">Faculty:</label>
              <select ref={facultyRef} name="faculty" className="form-control">
                <option>Choose one</option>
                {FACULTIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="quest_id">Quest ID:</label>
              <input ref={questIdRef} type="text" placeholder="jdoe" name="quest_id" className="form-control"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="id">Student Number:</label>
              <input ref={idRef} type="text" placeholder="20758495" name="id" className="form-control"></input>
            </div>

            <div className="row">
              <div className="mx-auto">
                <button type="submit" value="Submit" className="btn btn-success btn-responsive">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}
