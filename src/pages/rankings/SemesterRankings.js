import React from "react"

export default function SemesterRankings() {
  const rankings = [
    {
      "id": 11111111,
      "first_name": "Bob",
      "last_name": "Johnson",
      "points": 100
    },
    {
      "id": 22222222,
      "first_name": "Adam",
      "last_name": "Mahood",
      "points": 75
    },
    {
      "id": 33333333,
      "first_name": "Sasha",
      "last_name": "Nayer",
      "points": 50
    },
    {
      "id": 44444444,
      "first_name": "Deep",
      "last_name": "Kalra",
      "points": 25
    }
  ]

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
                <Ranking ranking={ranking} />
              ))}
            </tbody>

          </table>
        
        </div>
      </div>

    </div>
  )
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
  )
}
