import React, { useState, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";

import RankingsTable from "../components/RankingsTable";

export default function SemesterRankings(): ReactElement {
  const { semesterId } = useParams<{ semesterId: string }>();

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
      <h1>Rankings</h1>

      <div className="list-group">
        <RankingsTable rankings={rankings} />
      </div>
    </div>
  );
}
