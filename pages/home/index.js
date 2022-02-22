import React from "react";
import Layout from "../components/Layout";
import cookie from "js-cookie";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector(state => state.auth)

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

  // console.log('daristore', user)
  return (
      <div className="homeWrapper">
        <div className="home-welcome">
          { user.isAuthenticated ? (<h2>Welcome, {user.username}</h2>) 
          : (<h2>Welcome, Visitor</h2>)}
          <GameHistory/>
        </div>
      </div>
  );
}

Home.Layout = Layout;

export default Home;
