import React, { useState } from "react";
import User from "../../controller/UserController";
import style from "./Authpage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import firebase from "../../controller/firebase";

function Login() {
  const userredux = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { user } = await User.logIn(email, password);
      if (!user.displayName) {
        cookie.set("email", email, {path: "/"})
        alert("Please update your profile")
        router.push("/home/createprofile")
      } else {
        // await User.getProfile(user.displayName)
        firebase.database().ref("users/" + user.displayName).on("value", (snapshot) => {
          const userfb = snapshot.val()
          dispatch(authActions.login(userfb))
          sessionStorage.setItem("user", JSON.stringify({
            ...userfb,
            isAuthenticated: true
          }))
            // cookie.set(
            //   "profile",
            //   JSON.stringify(snapshot.val()),
            //   { path: "/" }
            // )
          router.push("/home")
        }) 
       }
    } catch (err) {
      console.log(err.message)
      // alert(err.message);
    }
  };

  const keyHandler = (event) => {
    if (event.key === 'Enter') {
      handleLogin() 
    }  
  }

  return ( 
    <div className={style.login} onKeyPress={keyHandler}>
      <div className={style["login-form"]} data-testid="loginform">
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Sign In</button>
        <p>Don&apos;t have an account?{" "}
          <Link href="/signup" passHref>Sign Up</Link>
        </p>
        <p>Forget Your Password? <Link href="/resetpassword" passHref>Reset pasword</Link></p>
      </div>
    </div>
  );
}

export default Login;