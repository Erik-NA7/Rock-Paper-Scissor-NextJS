import style from "./PlayRPS.module.css";

function PlayButtons(props) {
  const {
    username,
    plRock,
    plRockClick,
    plPaper,
    plPaperClick,
    plScissors,
    plScissorsClick,
    status,
    statusClass,
    comRock,
    comRockClick,
    comPaper,
    comPaperClick,
    comScissors,
    comScissorsClick,
    unlock,
   } = props

  return (
    <>      
      {/* Player Move Pallet */}
      <div className={style["play-buttons-container"]}>
        <h3>{username}</h3>
        <div className={style.option}>                      
          <div name="Rock" className={`${plRock} ${style.rock}`} onClick={plRockClick} disabled={unlock}>
          </div>
        </div>
        <div className={style.option}>                      
          <div name="Paper" className={`${plPaper} ${style.paper}`} onClick={plPaperClick} disabled={unlock}>
          </div>
        </div>
        <div className={style.option}>
          <div name="Scissors" className={`${plScissors} ${style.scissors}`} onClick={plScissorsClick} disabled={unlock}>
          </div>                    
        </div>                     
      </div>
        
      {/* Player Move Pallet-end */} 

      <div className={style["status-container"]}>
        <div className={statusClass}>{status}</div>
      </div>       

      {/* COM Move Pallet */}   
      <div className={style["play-buttons-container"]}>
        <h3>COM</h3>                       
        <div className={style.option}>                      
          <div name="Rock" className={`${comRock} ${style.rock}`} disabled onClick={comRockClick}>
          </div>
        </div>
        <div className={style.option}>                      
          <div name="Paper" className={`${comPaper} ${style.paper}`} disabled onClick={comPaperClick}>
          </div>
        </div>
        <div className={style.option}>                      
          <div name="Scissors" className={`${comScissors} ${style.scissors}`} disabled onClick={comScissorsClick}>
          </div>
        </div>
      </div>
      {/* COM Move Pallet End */}     
    </>        
  )
}

export default PlayButtons;