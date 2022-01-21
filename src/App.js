import React, { useEffect, useState } from "react";
import axios from "axios";
import TableData from "./component/TableData";

function App() {
  const [playersData, setPlayersData] = useState([]);
  useEffect(() => {
    const callData = async () => {
      const leaderBoardData = await axios.get(
        "https://leaderboard-techtest.herokuapp.com/api/1/events/1000/leaderboard/",
        {
          headers: {
            authorization: "3FRFGMD7Q4P1EEKPRKOQ",
          },
        }
      );
      if (leaderBoardData.status === 200) {
        const allPlayers = await axios.get(
          "https://leaderboard-techtest.herokuapp.com/api/1/players/",
          {
            headers: {
              authorization: "3FRFGMD7Q4P1EEKPRKOQ",
            },
          }
        );
        if (allPlayers.status === 200) {
          const sortedLeaderBoard = leaderBoardData.data.data.sort(
            (a, b) => a.score - b.score
          );
          let currentScore = sortedLeaderBoard[0].score;
          let currentPos =
            sortedLeaderBoard[0].score !== sortedLeaderBoard[1].score
              ? "1"
              : "T1";
          setPlayersData(
            sortedLeaderBoard.map((item, index) => {
              let pos;
              if (item.score === currentScore) {
                pos = currentPos;
              } else {
                if (index !== sortedLeaderBoard.length - 1) {
                  currentScore = sortedLeaderBoard[index].score;
                  currentPos =
                    sortedLeaderBoard[index].score !==
                    sortedLeaderBoard[index + 1].score
                      ? index + 1
                      : `T${index + 1}`;
                  pos = currentPos;
                } else {
                  // for the last item
                  pos = index + 1;
                }
              }
              const playerData = allPlayers.data.data.find(
                (player) => player.id === item.player_id
              );
              return {
                ...playerData,
                ...item,
                pos,
              };
            })
          );
        }
      }
    };

    callData();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Player</th>
            <th>Tot</th>
            <th>Score</th>
            <th>Thru</th>
          </tr>
        </thead>

        <TableData playersData={playersData} />
      </table>
    </div>
  );
}
export default App;
