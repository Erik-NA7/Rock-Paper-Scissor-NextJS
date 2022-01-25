import { useRouter } from 'next/router';
import { useState } from 'react';
import UserController from '../../controller/UserController';
import style from '../login/Authpage.module.css'


export default function Forgot(){
  const router = useRouter();
  const [ email, setEmail ] = useState("")
  const submit = () => {
    UserController.forgotPassword(email)
    .then(() => router.push("/login"))
  }  
  
  return (
    <div className={style.login}>
    <div className={style.loginContainer}>
    <h1 className={style.h1} >Reset Password</h1>
      <label className={style.label}>Email</label>
      <input
        className={style.input}
        type="text"
        autoFocus
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />    
      <div className={style.btnContainer}>
        <button className={style.signIn} onClick={submit}>Submit</button>
      </div>
    </div>
  </div> 
    );
  }