import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import User from "../../controller/UserController";
import Sidebar from "../../components/Sidebar";

function HomeLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  const [totalScore, setTotalScore ] = useState(0);
  const logout = async () => {
    await User.logOut()
    .then(() => router.push("/"))
  }

  useEffect(() => {
    setTotalScore(user.total_score);
  }, [user])

  return (
    <>
      <div className="homeNavbar">
        <div className="userhud">
          <div className="navIconProfile">
            <CgProfile/>
            <RiArrowDownSFill/>
            <Sidebar onLogout={logout}/>
          </div>
          <div>{user.username} |</div>
          <div className="totalScores">Score: {totalScore}</div>
        </div>
      </div>
      <div className="homeContainer">
        {children}
      </div>
    </>
  );
}

export default HomeLayout;