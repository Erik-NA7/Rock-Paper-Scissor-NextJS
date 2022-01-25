import Sidebar from "../components/Sidebar";
import User from "../../controller/UserController";
import cookie from "js-cookie";
import useSWR from "swr";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import { useRouter } from "next/router";

const getData = async (url) => cookie.get(url)

function HomeLayout({ children }) {
  const { data } = useSWR("profile", getData)
  const router = useRouter();
  const user = data ? JSON.parse(data) : {
    username: "Visitor",
    total_score: 0
  };
  
  const logout = async () => {
    await User.logOut()
    .then(() => router.push("/"))
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