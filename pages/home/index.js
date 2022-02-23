import { useEffect } from "react";
import Layout from "../components/Layout";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

function Home() {
  const dispatch = useDispatch()
  const fromStore =  useSelector(state => state.auth);
  const fromSession = typeof window !== 'undefined' ? sessionStorage.getItem("user") : null

  const user = fromSession ? JSON.parse(fromSession) : fromStore;

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

  useEffect(() => {
    if (fromSession && !fromStore) {
      dispatch(authActions.login(fromSession))
    }
  }, [])
  

  console.log(user)
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
