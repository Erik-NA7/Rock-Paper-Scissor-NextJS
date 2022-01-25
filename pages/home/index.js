import React from "react";
import HomeLayout from "./HomeLayout";
import cookie from "js-cookie";
import useSWR from "swr";

const getData = async (url) => cookie.get(url);

function Home() {
  const { data } = useSWR("profile", getData)
  const user = data ? JSON.parse(data) : null

  const GameHistory = () => {
    const lastGame = cookie.get("lastGame")
    if (lastGame) {
      return (
        <h3>You gained {lastGame} points from your last game</h3>
      )
    } else {
      return null
    }
  }

  return (
      <div className="homeWrapper">
        <div className="home-welcome">
          { user ? (<h2>Welcome, {user.username}</h2>) 
          : (<h2>Welcome, Visitor</h2>)}
          <GameHistory/>
        </div>
      </div>
  );
}

Home.Layout = HomeLayout;

export default Home;
