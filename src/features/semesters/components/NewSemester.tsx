import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendAPIRequest } from "../../../lib";
import { APIErrorResponse } from "../../../types";

export function NewSemester() {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
  const startingBudgetRef = useRef<HTMLInputElement | null>(null);
  const membershipFeeRef = useRef<HTMLInputElement | null>(null);
  const discountedMembershipFeeRef = useRef<HTMLInputElement | null>(null);
  const rebuyFeeRef = useRef<HTMLInputElement | null>(null);
  const metaRef = useRef<HTMLTextAreaElement | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    sendAPIRequest<APIErrorResponse>("semesters", "POST", {
      name: nameRef.current?.value,
      startDate: new Date(startDateRef.current?.value || ""),
      endDate: new Date(endDateRef.current?.value || ""),
      startingBudget: Number(startDateRef.current?.value),
      membershipFee: Number(membershipFeeRef.current?.value),
      membershipDiscountFee: Number(discountedMembershipFeeRef.current?.value),
      rebuyFee: Number(rebuyFeeRef.current?.value),
      meta: metaRef.current?.value,
    }).then(({ status, data }) => {
      if (status === 201) {
        return navigate("../");
      } else if (status === 400) {
        setErrorMessage(data ? data.message : "An unknown error has occurred, check the logs for more information.");
      }
    });
  };

  return (
    <div>
      <h1 className="text-center">New Semester</h1>
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
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input data-qa="name" ref={nameRef} type="text" name="name" className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="start_date">Start Date</label>
                <input data-qa="start-date" ref={startDateRef} type="date" name="start_date" className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="end_date">End Date</label>
                <input data-qa="end-date" ref={endDateRef} type="date" name="end_date" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Starting Budget</label>
                <input
                  data-qa="starting-budget"
                  ref={startingBudgetRef}
                  type="number"
                  name="startingBudget"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Membership Fee</label>
                <input
                  data-qa="membership-fee"
                  ref={membershipFeeRef}
                  type="number"
                  name="membershipFee"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Discounted Membership Fee</label>
                <input
                  data-qa="discounted-membership-fee"
                  ref={discountedMembershipFeeRef}
                  type="number"
                  name="discountedMembershipFee"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rebuy Fee</label>
                <input data-qa="rebuy-fee" ref={rebuyFeeRef} type="number" name="rebuyFee" className="form-control" />
              </div>

              <div className="mb-3">
                <label htmlFor="meta">Additional Details</label>
                <textarea data-qa="additional-details" ref={metaRef} rows={6} name="meta" className="form-control" />
              </div>

              <div className="row">
                <div className="text-center">
                  <button data-qa="form-submit" type="submit" value="submit" className="btn btn-success btn-responsive">
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
