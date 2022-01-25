import Link from "next/link";
import loadable from "@loadable/component";
import style from "./components/LandingPage.module.css";
const TopNavbar = loadable(() => import("./components/Topnavbar"));
const VideoPlayer = loadable(() => import("./components/VideoPlayer"));

export default function LandingPage() {

  return (
    <>
      <TopNavbar/>   
      <div className={style.HeroContainer}>  
        <div className={style.HeroBg}>
          <VideoPlayer/>
        </div>
        <div className={style.HeroContent}>
          <h1>PLAY TRADITIONAL GAMES</h1>
          <h4 className={style.p}> Experience New Traditional Gameplay</h4>
          <Link href="/home/gamelist" passHref>
            <button>
              PLAY NOW 
            </button>
          </Link>
        </div>
      </div>
    </> 
  );
}