import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();