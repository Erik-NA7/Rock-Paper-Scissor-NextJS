import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa"
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

  const [ isMobile, setIsMobile ] = useState(false)

  const sideBarToggle = () => {
    setIsMobile(!isMobile)
  }

  let sidebarStyle = isMobile ? "sidebar mobile" : "sidebar"

  return (
    <div className="sidebar-container">
      <div className={sidebarStyle}>
        <Link href="/home" passHref>
          <a className="sidebarItem" onClick={sideBarToggle}><RiHomeSmileLine className="sidebarIcon" />
            Home
          </a>
        </Link>
        <a className="sidebarItem" onClick={toEditProfile}>
          <RiEditCircleFill className="sidebarIcon" />
          Edit Profile
        </a>
        <Link href="/home/gamelist" passHref>
          <a className="sidebarItem" onClick={sideBarToggle}>
            <IoGameController className="sidebarIcon" />
            Game List
          </a>
        </Link>
        <Link href="/home/players" passHref>
          <a className="sidebarItem" onClick={sideBarToggle}>
            <RiContactsLine className="sidebarIcon" />
            All Players
          </a>
        </Link>
        <Link href="/home/leaderboard" passHref>
          <a className="sidebarItem" onClick={sideBarToggle}>
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
      <div className="sidebar-toggle" onClick={sideBarToggle}>
        
          {isMobile ? <FaAngleDoubleLeft/> : <FaAngleDoubleRight/>}
     
      </div> 
    </div>
  );
};

export default Sidebar