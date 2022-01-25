import fire from "./firebase";
import cookie from "js-cookie";

const fireAuth = fire.auth();
const fireDb = fire.database();

const UserController = {
  //New user Sign Up
  SignUp: async (email, password) => {
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        fireAuth.currentUser.sendEmailVerification().then(() => {
          alert("Please check your E-Mail and verify your account");
        });
      })
      .catch((err) => alert(err.message));
  },

  logIn: async (email, password) => {
    return fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          throw new Error(
            "Your email has not been verified\n Check your email for verification link"
          );
        }
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },

  getProfile: async (username) => {
    return fireDb.ref("users/" + username).on("value", (snapshot) => {
      return Promise.resolve(
        cookie.set(
          "profile",
          JSON.stringify(snapshot.val()),
          { path: "/" }
        )
      );
    })
  },

  forgotPassword: async (email) => {
    fireAuth
      .sendPasswordResetEmail(email)
      .then(() =>
        alert("The link to reset your password has been sent to your email")
      )
      .catch((err) => alert(err.message));
  },

  checkUserName: async (username) => {
    fireDb.ref("users/" + username)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        alert("Username is already taken");  
      }
    })
  },

  createNewUser: async (user) => {
    fireDb.ref("users/" + user.username).set(user)
    .then(() => {
      fireAuth.currentUser.updateProfile({
        displayName: user.username
      })
    })
    .catch(err => alert(err.message))        
  },

  updateFullName: async (username, fullname) => {
    fireDb.ref("users/" + username).update({
      'fullname': fullname
    })
    .catch((err) => alert(err.message));
  },

  updateAvatar: async (username, avatarURL) => {
    fireDb.ref("users/" + username).update({
      'avatar': avatarURL
    })
    .catch((err) => alert(err.message));
  },

  UpdateEmail: async (email) => {
    fireAuth.currentUser
    .updateEmail(email)
    .then((res) => alert(res.message))
    .catch((err) => alert(err.message));
  },

  // Check if user has been verified, if not, the user cannot play game
  VerifyAccount: async () => {
    return fireAuth.currentUser.emailVerified;
  },

  // User logout
  logOut: async () => {
    cookie.remove("profile");
    cookie.remove("lastGame");
    fireAuth.signOut()
  },

  // Get all users profile
  getAllUsersData: async () => {
    const data = [];
    fireDb
      .ref("users")
      .orderByChild("username")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          data.push({
            id: child.key,
            username: child.val().username,
            email: child.val().email,
            score: child.val().total_score,
          });
        });
      });
    return data;
  },

  // Get current leaderboard
  getLeaderBoard: async () => {
    const data = [];
    fireDb
      .ref("users")
      .orderByChild("total_score")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          data.push({
            id: child.key,
            username: child.val().username,
            email: child.val().email,
            score: child.val().total_score,
          });
        });
      });
    return data.reverse();
  },
};

export default UserController;