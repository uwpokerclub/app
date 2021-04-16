import React, { ReactElement } from "react";

import { Ranking } from "../../types";

export interface Props {
  rankings: Ranking[];
}

export default function RankingsTable({ rankings }: Props): ReactElement {
  return (
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
          {rankings.map((ranking, idx) => (
            <tr key={ranking.id}>
              <td>{idx + 1}</td>
              <td className="studentno">{ranking.id}</td>

              <td className="fname">{ranking.first_name}</td>

              <td className="lname">{ranking.last_name}</td>

              <td className="score">{ranking.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
