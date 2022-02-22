import Sidebar from "./Sidebar";
import User from "../../controller/UserController";
import cookie from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";


function HomeLayout({ children }) {
  const router = useRouter();
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()
  
  const logout = async () => {
    dispatch(authActions.logout());
    router.push("/")
  }

  return (
    <>
      <div className="homeNavbar">
        <div className="userhud">
          <div className="navIconProfile">
            <CgProfile/>
            <RiArrowDownSFill/>
            <Sidebar user={user} onLogout={logout}/>
          </div>
          <div>{user.username} |</div>
          <div className="totalScores">Score: {user.total_score}</div>
        </div>
      </div>
      <div className="homeContainer">
      {children}
      </div>
    </>
  );
}

export default HomeLayout;