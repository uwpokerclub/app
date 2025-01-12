import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { Ranking } from "../../../types";
import { DownloadRankingsButton } from "./DownloadRankingsButton";

export function RankingsTable() {
  const { semesterId = "" } = useParams<{ semesterId: string }>();

  const { data: rankings } = useFetch<Ranking[]>(`semesters/${semesterId}/rankings`);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Rankings</h1>

        <DownloadRankingsButton semesterID={semesterId} />
      </div>

      <div className="list-group">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Place</th>

                <th className="sort">Student#</th>

                <th className="sort">First Name</th>

                <th className="sort">Last Name</th>

                <th className="sort">Score</th>
              </tr>
            </thead>

            <tbody className="list">
              {rankings?.map((ranking, idx) => (
                <tr key={ranking.id}>
                  <td>{idx + 1}</td>
                  <td className="studentno">{ranking.id}</td>

                  <td className="fname">{ranking.firstName}</td>

                  <td className="lname">{ranking.lastName}</td>

                  <td className="score">{ranking.points}</td>
                </tr>
              )) || <></>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
