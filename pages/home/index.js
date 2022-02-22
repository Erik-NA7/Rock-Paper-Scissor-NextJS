import React from "react";
import HomeLayout from "./HomeLayout";
import cookie from "js-cookie";
import { useSelector } from "react-redux";

function Home() {
  const userRedux = useSelector(state => state.auth)

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

  console.log('daristore', userRedux)
  return (
      <div className="homeWrapper">
        <div className="home-welcome">
          { userRedux.isAuthenticated ? (<h2>Welcome, {userRedux.username}</h2>) 
          : (<h2>Welcome, Visitor</h2>)}
          <GameHistory/>
        </div>
      </div>
  );
}

Home.Layout = HomeLayout;

export default Home;
