import React, { useState } from "react";
import User from "../../controller/UserController";
import style from "../login/Authpage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    try {
      User.SignUp(email, password)
      .then(() => {
          router.push("/login")
      })
    } catch (err) {
      alert(err.message);
    }
  };

  const keyHandler = (event) => {
    if (event.key === 'Enter') {
      if (haveAccount) {
        handleLogin()
      } else if (!haveAccount) {
        handleSignUp()
      }
    }  
  }

  return (
    <div className={style.login} onKeyPress={keyHandler}>
      <div className={style["login-form"]} data-testid="loginform">
        <h2>Sign Up</h2>
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
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Have an account? <Link href="/login" passHref>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;