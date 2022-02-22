import React, { useState } from "react";
import User from "../../controller/UserController";
import style from "./Authpage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import firebase from "../../controller/firebase";

function Login({ apiKey }) {
  
  const userredux = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
      // const { user } = await User.logIn(email, password);
      // if (!user.displayName) {
      //   cookie.set("email", email, {path: "/"})
      //   alert("Please update your profile")
      //   router.push("/home/createprofile")
      // } 
    const login = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log(login.idToken)
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok ) {
        res.json().then(data => {
          console.log(data)
        })
      } else {
        return res.json().then((data) => {
          // let errorMesage = 'Authentication failed!'
          // throw new Error(errorMesage)
          console.log(data)
        })
      }
    }).catch(err => {
      console.log(err.message)
    })
     
      // const loggedInUser = user.displayName ? true : false;
      // dispatch(authActions.login(loggedInUser));
      // sessionStorage.setItem('user', JSON.stringify(loggedInUser));
      // router.push("/home")
  };

  // const keyHandler = (event) => {
  //   if (event.key === 'Enter') {
  //     handleLogin() 
  //   }  
  // }

  return ( 
    <form className={style.login} onSubmit={handleLogin}>
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
    </form>
  );
}

export async function getStaticProps() {
  const env = process.env.NEXT_PUBLIC_API_KEY
  console.log(env)
  return {
    props: { apiKey: env }
  }
}

export default Login;