import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SemesterRankings() {
  const { semesterId } = useParams();

  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch(`/api/semesters/${semesterId}/rankings`)
      .then((res) => res.json())
      .then((data) => {
        setRankings(data.rankings);
      });
  }, [semesterId]);

  return (
    <div>

      <h1>
        Rankings
      </h1>

      <div className="list-group">
        <div className="table-responsive">

          <table className="table">

            <thead>
              <tr>

                <th className="sort">
                  Student#
                </th>

                <th className="sort">
                  First Name
                </th>

                <th className="sort">
                  Last Name
                </th>

                <th className="sort">
                  Score
                </th>

              </tr>
            </thead>

            <tbody className="list">
              {rankings.map((ranking) => (
                <Ranking key={ranking.id} ranking={ranking} />
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

const Ranking = ({ ranking }) => {
  return (
    <tr>

      <td className="studentno">
        {ranking.id}
      </td>

      <td className="fname">
        {ranking.first_name}
      </td>

      <td className="lname">
        {ranking.last_name}
      </td>

      <td className="score">
        {ranking.points}
      </td>

    </tr>
  );
};
