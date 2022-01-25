import HomeLayout from "../HomeLayout";
import React, { useEffect, useState } from "react";
import PlayButtons from "./PlayButtons";
import { comPlay, Result, updateScore } from "../../../controller/GameController"
import cookie from "js-cookie";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import style from "./PlayRPS.module.css";


const getData = (url) => cookie.get(url)


function PlayRPS() {
  const { data } = useSWR("profile", getData);
  const playerButton = style["player-button"];
  const comButton = style["com-button"];

  // Player scoreboard
  const [ username, setUsername ] = useState("");
  const [ avatar, setAvatar ] = useState("")
  const [ totalScore, setTotalScore ] = useState(0);
  const [ winStreak, setWinStreak ] = useState(0)
  const [ points, setPoints ] = useState(0)

  // COM scoreboard
  const [ comScore, setComScore ] = useState(0);
  const [ comWinStreak, setComStreak ] = useState(0)
  const [ comPoints, setComPoints ] = useState(0)
   
  // Buttons
  const [ plRock, setplRock ] = useState(playerButton);
  const [ plPaper, setplPaper ] = useState(playerButton);
  const [ plScissors, setplScissors ] = useState(playerButton);
  const [ unlock, Lock ] = useState(false);

  // Computer
  const [ comRock, setcomRock ] = useState(comButton);
  const [ comPaper, setcomPaper ] = useState(comButton);
  const [ comScissors, setcomScissors ] = useState(comButton);

  // Display Result
  const display = "VS";
  const StatusClass = style.status;
  const [ status, setStatus ] = useState(display)
  const [ statusClass, setstatusClass ] = useState(StatusClass)

  // The Battle
  const plRockClick = () => {
    if (unlock) return;
    setplRock(playerButton + ` ${style.clicked}`);
    setplPaper(playerButton);
    setplScissors(playerButton);
    resultDisplay("Rock");
    Lock(true);
}

  const plPaperClick = () => {
    if (unlock) return;
    setplPaper(playerButton + ` ${style.clicked}`);
    setplRock(playerButton);
    setplScissors(playerButton);
    resultDisplay("Paper");
    Lock(true);
  }

  const plScissorsClick = () => {
    if (unlock) return;
    setplScissors(playerButton + ` ${style.clicked}`);
    setplPaper(playerButton);
    setplRock(playerButton); 
    resultDisplay("Scissors");
    Lock(true);
  }

  const addUserScore = () => {
    let extraPoints = 0
    let pointsThisRound = 0
    if (winStreak === 1) {
      extraPoints = 100;
    }
    if (winStreak === 2) {
      extraPoints = 200;
    }
    if (winStreak === 3) {
      extraPoints = 500;
    }
    if (winStreak >= 4) {
      extraPoints = 1000;
    }
    pointsThisRound = 1000 + extraPoints;
    setPoints(pointsThisRound);
    setTotalScore(totalScore + pointsThisRound);
    updateScore(username, totalScore + pointsThisRound);
  }

  const addComScore = () => {
    let extraPoints = 0
    let pointsThisRound = 0
    if (comWinStreak === 1) {
      extraPoints = 100;
    }
    if (comWinStreak === 2) {
      extraPoints = 200;
    }
    if (comWinStreak === 3) {
      extraPoints = 500;
    }
    if (comWinStreak >= 4) {
      extraPoints = 1000;
    }
    pointsThisRound = 1000 + extraPoints
    setComPoints(pointsThisRound);
    setComScore(comScore + pointsThisRound);
  }

  const resultDisplay = async (plMove) => {
    let com = comPlay(comRockClick, comPaperClick, comScissorsClick);
    let result = Result(plMove, com)
    if (result === "DRAW") {
      setstatusClass(StatusClass + ` ${style["status-result"]} ${style.draw}`)
      setStatus("DRAW");
      setPoints(0);
      setWinStreak(0);
      setComPoints(0);
      setComStreak(0);
    }
    else if (result === "YOU") {    
      setstatusClass(StatusClass + ` ${style["status-result"]} ${style.winner}`)
      setStatus("YOU\nWIN");
      setWinStreak(winStreak + 1);
      addUserScore(winStreak);
      setComPoints(0);
      setComStreak(0);
    }
    else {
      setstatusClass(StatusClass + ` ${style["status-result"]} ${style.winner}`)
      setStatus("SORRY!!");
      setComStreak(comWinStreak + 1);
      addComScore(comWinStreak);
      setPoints(0);
      setWinStreak(0);     
    }
  }

  // Computer click
  const comRockClick = () => {
    setcomRock(comButton + ` ${style.clicked}`);
    setcomPaper(comButton);
    setcomScissors(comButton);
  }

  const comPaperClick = () => {
    setcomPaper(comButton + ` ${style.clicked}`);
    setcomRock(comButton);
    setcomScissors(comButton);
  }

  const comScissorsClick = () => {
    setcomScissors(comButton + ` ${style.clicked}`);
    setcomPaper(comButton);
    setcomRock(comButton);
  }

  // Reset states
  const resetButton = () => {
    Lock(false)
    setplRock(playerButton);
    setplPaper(playerButton);
    setplScissors(playerButton);
    setcomRock(comButton);
    setcomPaper(comButton);
    setcomScissors(comButton);
    setStatus(display);
    setstatusClass(StatusClass);
  }

  const quitButton = () => {
    const user = JSON.parse(data);
    if (user.total_score != totalScore ) {
    cookie.set(
      "lastGame",
      (totalScore - user.total_score),
      { path: "/"}
    )
    user.total_score = totalScore
    cookie.set("profile", JSON.stringify(user)) 
    }
  }

  useEffect(() => {
    const user = data ? JSON.parse(data) : null
    if (user) {
      setTotalScore(user.total_score);
      setUsername(user.username);
      setAvatar(user.avatar)
    }
  }, [data, avatar])

  return (
    <div className="homeWrapper">
    <div className={style.gamescreen}>
      <h3>ROCK PAPER SCISSORS</h3>
      <div className={style.gameboard}>
        <div className={style.score}>
          { avatar? (
          <div>
            <Image src={avatar} width={60} height={60} alt="avatar"/>
          </div>) : (
            null
          )}
          <p className={style["score-label"]}>This Round: {points}</p>
          <p className={style["score-label"]}>Win Streak: {winStreak}</p>
        </div>
        <PlayButtons
          username={username}
          plRock={plRock}
          plRockClick={plRockClick}
          plPaper={plPaper}
          plPaperClick={plPaperClick}
          plScissors={plScissors}
          plScissorsClick={plScissorsClick}
          status={status}
          statusClass={statusClass}
          comRock={comRock}
          comRockClick={comRockClick}
          comPaper={comPaper}
          comPaperClick={comPaperClick}
          comScissors={comScissors}
          comScissorsClick={comScissorsClick}
          unlock={unlock}
        />
        <div className={style.score}>
          <div> 
            <Image src="https://res.cloudinary.com/erikna7/image/upload/v1633259369/rps-next/user_avatar/careobot_vqx0s1.png" width={60} height={60} alt="avatar"/>
          </div> 
          <p className={style["score-label"]}>This Round: {comPoints}</p>
          <p className={style["score-label"]}>Win Streak: {comWinStreak}</p>     
        </div>
      </div>
      <div>
        <button className={style.control} type="button" onClick={resetButton}>PLAY AGAIN</button>
        <Link href="/home" passHref>
          <button className={`${style.control} ${style["quit-btn"]}`} type="button" onClick={quitButton}>QUIT</button>
        </Link>        
      </div>
    </div>
    </div>
  )
}

PlayRPS.Layout = HomeLayout;

export default PlayRPS;
