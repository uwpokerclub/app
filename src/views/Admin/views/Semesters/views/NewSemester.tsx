import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import sendAPIRequest from "../../../../../shared/utils/sendAPIRequest";
import { APIErrorResponse } from "../../../../../types";

function NewSemester(): ReactElement {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startingBudget, setStartingBudget] = useState("");
  const [membershipFee, setMembershipFee] = useState("");
  const [discountedMembershipFee, setDiscountedMembershipFee] = useState("");
  const [rebuyFee, setRebuyFee] = useState("");
  const [meta, setMeta] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendAPIRequest<APIErrorResponse>("semesters", "POST", {
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      startingBudget: Number(startingBudget),
      membershipFee: Number(membershipFee),
      membershipDiscountFee: Number(discountedMembershipFee),
      rebuyFee: Number(rebuyFee),
      meta,
    }).then(({ status, data }) => {
      if (status === 201) {
        return navigate("../");
      }

      if (status === 400) {
        setErrorMessage(data ? data.message : "");
      }
    });
  };

  return (
    <div>
      <h1 className="center">New Semester</h1>
      <div className="row">
        <div className="col-md-3" />

        <div className="col-md-6">
          {errorMessage && (
            <div role="alert" className="alert alert-danger">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="mx-auto">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Starting Budget</label>
                <input
                  type="number"
                  className="form-control"
                  value={startingBudget}
                  onChange={(e) => setStartingBudget(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Membership Fee</label>
                <input
                  type="number"
                  className="form-control"
                  value={membershipFee}
                  onChange={(e) => setMembershipFee(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Discounted Membership Fee</label>
                <input
                  type="number"
                  className="form-control"
                  value={discountedMembershipFee}
                  onChange={(e) => setDiscountedMembershipFee(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rebuy Fee</label>
                <input
                  type="number"
                  className="form-control"
                  value={rebuyFee}
                  onChange={(e) => setRebuyFee(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="meta">Additional Details</label>
                <textarea
                  rows={6}
                  name="meta"
                  className="form-control"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
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

export default NewSemester;
