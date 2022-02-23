import Layout from "../../components/Layout";
import style from "../Table.module.css";
import fire from "../../../controller/firebase"

function Leaderboard({ scores }) {

  const rankColor = (rank) => {
    if (rank == 1) {
      return style.rankOne
    } else if (rank == 2) {
      return style.rankTwo
    } else if (rank == 3) {
      return style.rankThree
    } else {
      return style.tabletd
    }
  }

  return (
    <div className={style["table-container"]}>
      <h2>Leaderboard</h2>
      <table data-testid="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores && scores.map((user, index) => {
            return (
              <tr key={index}>
                <td className={rankColor(index + 1)}>{index + 1}</td>
                <td className={rankColor(index + 1)}>{user.username}</td>
                <td className={rankColor(index + 1)}>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Leaderboard.Layout = Layout;

export async function getServerSideProps() {
  const data = []
  await fire.database()
  .ref("users")
  .orderByChild("total_score")
  .once("value", (snapshot) => {    
    snapshot.forEach((child) => {
      if (child.val().total_score > 0) {
        data.push({
          id: child.key,
          username: child.val().username,
          score: child.val().total_score,
        });
      }
    });
  });
  data.sort((a, b) => b.score - a.score)
  return { props: { scores: data.slice(0, 9) }}
}

export default Leaderboard;