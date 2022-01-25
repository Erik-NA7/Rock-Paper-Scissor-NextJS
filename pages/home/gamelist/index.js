import HomeLayout from "../HomeLayout";
import style from "./Gamelist.module.css";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import useSWR from "swr";
import fire from "../../../controller/firebase"

const getData = (url) => cookie.get(url)

function GameList({ games }) {
  const router = useRouter()
  const { data } = useSWR("profile", getData)
  const user = data ? JSON.parse(data) : null
  const playgame = () => {
    if (!user) {
      alert("Login to play")
      router.push("/login")
    }
    if (user) {
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

GameList.Layout = HomeLayout;

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