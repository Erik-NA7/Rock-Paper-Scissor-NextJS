import HomeLayout from "../HomeLayout";
import style from "../Table.module.css";
import fire from "../../../controller/firebase";

function Players({ users }) {

  return (
    <div className={style["table-container"]}>
      <h2>Active Players</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => {
            return (
              <tr key={index}>
                <td className={style.tabletd}>{index + 1}</td>
                <td className={style.tabletd}>{user.username}</td>
                <td className={style.tabletd}>{user.fullname}</td>
                <td className={style.tabletd}>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

Players.Layout = HomeLayout;

export async function getServerSideProps() {
  const data = []
  await fire.database()
  .ref("users")
  .orderByChild("username")
  .limitToFirst(10)
  .once("value", (snapshot) => {    
    snapshot.forEach((child) => {
      if (child.val().total_score > 0) {
        data.push({
          id: child.key,
          username: child.val().username,
          fullname: child.val().fullname,
          score: child.val().total_score,
        });
      }
    });
  });
  return { props: { users: data }}
}

export default Players;