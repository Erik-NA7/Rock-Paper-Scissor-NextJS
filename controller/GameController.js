import fire from "./firebase";
const fireDb = fire.database()


export function GameDetails() {
  let game = []
  fireDb.ref('games/RPS').once('value', (snapshot) => {
    game = snapshot.val()
  })
  return game
}

export function comPlay(Rock, Paper, Scissors) {
  const option = ["Rock", "Paper", "Scissors"]
    let c = Math.floor(Math.random() * (3 - 0) + 0);
    let comMove = option[c];
    if (comMove === "Rock") {
      Rock();
    } else if (comMove === "Paper") {
      Paper();
    } else {
      Scissors();
    }
  return comMove
}

export function Result(pl, com) {    
  if (pl === com) {
    return "DRAW"
  }
  else if (pl === "Rock") {
    if (com === "Scissors") {
      return "YOU"
    } else {
      return "COMPUTER"
    }
  }
  else if (pl === "Paper") {
    if (com === "Rock") {
      return "YOU"
    } else {
      return "COMPUTER"
    }
  }
  else if (pl === "Scissors") {
    if (com === "Paper") {
      return "YOU"
    } else {
      return "COMPUTER"
    }
  }
}

// Update current user score
export function updateScore(username, totalScore) {
  fireDb.ref("users/" + username).update({ 'total_score': totalScore });
}