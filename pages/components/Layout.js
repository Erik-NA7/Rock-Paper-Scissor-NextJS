import Sidebar from "./Sidebar";
// import User from "../../controller/UserController";
// import cookie from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";


function Layout({ children }) {
  const router = useRouter();
  
  const dispatch = useDispatch()

  const daristore =  useSelector(state => state.auth);
  const darSestor = typeof window !== 'undefined' ? sessionStorage.getItem("user") : null

  const user = darSestor ? JSON.parse(darSestor) : daristore;
  
  const logout = async () => {
    dispatch(authActions.logout());
    router.push("/")
  }

  console.log("daristore", daristore)
  console.log("dari session", darSestor)
  console.log(user)

  const redirect = () => {
    if (!user.isAuthenticated) {
      alert("Log in to edit your profile")
      router.push("/login")
    } else {
      router.push("/home/editprofile")
    }
  }

  return (
    <>
      <div className="homeNavbar">
        <div className="userhud">
          <div className="navIconProfile">
            <CgProfile/>
            <RiArrowDownSFill/>
            <Sidebar user={user.isAuthenticated} onLogout={logout} toPrivateLink={redirect}/>
          </div>
          <div>{user.username} |</div>
          <div className="totalScores">Score: {user.total_score}</div>
        </div>
      </div>
      <div className="homeContainer">
        <childrenEl user={user}>
          {children}
        </childrenEl>
      </div>
    </>
  );
}

export default Layout;