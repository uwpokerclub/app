import React, { useState, useEffect, ReactElement } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../../hooks/useFetch";
import { Ranking } from "../../../../../types";

import RankingsTable from "../components/RankingsTable";

export default function SemesterRankings(): ReactElement {
  const { semesterId } = useParams<{ semesterId: string }>();

  const [rankings, setRankings] = useState<Ranking[]>([]);

  const { data } = useFetch<Ranking[]>(`semesters/${semesterId}/rankings`);

  useEffect(() => {
    if (data) {
      setRankings(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Rankings</h1>

      <div className="list-group">
        <RankingsTable rankings={rankings} />
      </div>
    </div>
  );
}
