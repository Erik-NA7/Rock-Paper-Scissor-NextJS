import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import fire from "../../../controller/firebase";
import style from "./Gamelist.module.css";

function GameList({ games }) {
  const router = useRouter()
  const user = useSelector(state => state.auth)
  const playgame = () => {
    if (!user.isAuthenticated) {
      alert("Login to play")
      router.push("/login")
    } else {
      router.push("/home/playrps")
    }
  }
  
  return (
      <div className={style.gamelistWrapper}>
        <h2>Games</h2>
        <div className={style.gamelist}>
        { games && games.map((game, index) => {
          return (
          <div key={index} className={style.gamebox}>
            <h3>{game.name}</h3>
            <p>{game.description}.</p>
            <p>{game.scoring}</p>
            { game.scoring ? (<button className={style.playBtnLink} onClick={playgame}>Play</button>) : null } 
          </div>
          );
        })}
        </div>  
      </div>
    
  );
}

GameList.Layout = Layout;

export async function getServerSideProps() {
  const data = []
  await fire.database()
  .ref("games")
  .once("value", (snapshot) => {    
    snapshot.forEach((child) => {
      data.push({
        id: child.key,
        name: child.val().game_name,
        description: child.val().description,
        scoring: child.val().scoring
      });
    });
  });
  return { props: { games: data.reverse() }}
}

export default GameList;