import { useRouter } from "next/router";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import {
  RiHomeSmileLine,
  RiEditCircleFill,
  RiContactsLine,
  RiFileChartLine,
  RiLogoutCircleLine } from "react-icons/ri";

function Sidebar(props) {
  
  const router = useRouter()

  const toEditProfile = () => {
    if (props.user.username === "Visitor") {
      alert("Log in to edit your profile")
      router.push("/login")
    } else {
      router.push("/home/editprofile")
    }
  }

  return (
    <div className="sidebar">
      <Link href="/home" passHref>
        <a className="sidebarItem"><RiHomeSmileLine className="sidebarIcon" />
          Home
        </a>
      </Link>
      <a className="sidebarItem" onClick={toEditProfile}>
        <RiEditCircleFill className="sidebarIcon" />
        Edit Profile
      </a>
      <Link href="/home/gamelist" passHref>
        <a className="sidebarItem">
          <IoGameController className="sidebarIcon" />
          Game List
        </a>
      </Link>
      <Link href="/home/players" passHref>
        <a className="sidebarItem">
          <RiContactsLine className="sidebarIcon" />
          All Players
        </a>
      </Link>
      <Link href="/home/leaderboard" passHref>
        <a className="sidebarItem">
          <RiFileChartLine className="sidebarIcon" />
          Leaderboard
        </a>
      </Link>
      { props.user ? (
        <a className="sidebarItem" onClick={props.onLogout}>
          <RiLogoutCircleLine className="sidebarIcon" />
          Logout
        </a>
        ) : (
        <Link href="/login" passHref>
          <a className="sidebarItem">
            <RiLogoutCircleLine className="sidebarIcon"/>
            Login
          </a>
        </Link>
      )}
    </div>
  );
};

export default Sidebar