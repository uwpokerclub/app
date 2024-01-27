import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Semester } from "../../../types";
import { MembershipsTable } from "./MembershipsTable";
import { TransactionsTable } from "./TransactionsTable";

import styles from "./SemesterInfo.module.css";

export function SemesterInfo() {
  const { semesterId = "" } = useParams<{ semesterId: string }>();

  const { data: semester } = useFetch<Semester>(`semesters/${semesterId}`);

  return (
    <div>
      <div className={styles.highlights}>
        <div className={`card ${styles.item}`}>
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.startingBudget).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Starting Budget</h6>
          </div>
        </div>

        <div className={`card ${styles.item}`}>
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.currentBudget).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Current Budget</h6>
          </div>
        </div>

        <div className={`card ${styles.item}`}>
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.membershipFee).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Membership Fee</h6>
          </div>
        </div>

        <div className={`card ${styles.item}`}>
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.membershipDiscountFee).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Membership Fee (Discounted)</h6>
          </div>
        </div>

        <div className={`card ${styles.item}`}>
          <div className="card-body">
            <h2 className="card-title">
              {Number(semester?.rebuyFee).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <h6 className="card-subtitle mb-2 text-muted">Rebuy Fee</h6>
          </div>
        </div>
      </div>

      <MembershipsTable semesterId={semesterId} />

      <TransactionsTable semesterId={semesterId} />
    </div>
  );
}
